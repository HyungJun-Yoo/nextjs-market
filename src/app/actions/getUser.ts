import { firebase_getDoc, firebase_getDocRef } from '@/firebase/crud'
import { IUser } from '@/firebase/type'

export default async function getUser(email: string) {
  try {
    const docRef = firebase_getDocRef('users', email)
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
