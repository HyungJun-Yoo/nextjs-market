import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { firebase_getDocRef, firebase_getDoc } from '@/firebase/crud'
import { IUser } from '@/firebase/type'

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
      const data = docSnap.data()
      const currentUser = {
        ...data,
        createdAt: data.createdAt.toDate(),
        updateAt: data.updateAt.toDate(),
      }
      return currentUser as IUser
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}
