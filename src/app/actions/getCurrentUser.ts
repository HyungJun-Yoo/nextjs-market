import { db } from '@/firebase/config'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { doc, getDoc } from 'firebase/firestore'
import { getServerSession } from 'next-auth'
import { User } from '@/pages/api/auth/[...nextauth]'

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user?.email) return null

    const docRef = doc(db, 'users', session.user.email)
    const docSnap = await getDoc(docRef)

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
