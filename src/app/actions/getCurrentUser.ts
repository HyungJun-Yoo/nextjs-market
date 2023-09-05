import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { User } from '@/pages/api/auth/[...nextauth]'
import { firebase_getDocRef, firebase_getDoc } from '@/firebase/crud'

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user?.email) return null

    const docRef = firebase_getDocRef('users', session.user.email)
    const docSnap = await firebase_getDoc(docRef)

    if (docSnap.exists()) {
      const currentUser = docSnap.data()
      return currentUser as User
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}
