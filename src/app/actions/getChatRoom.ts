import getCurrentUser from '@/app/actions/getCurrentUser'
import { firebase_getDoc, firebase_getDocRef } from '@/firebase/crud'
import { IConversation } from '@/firebase/type'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

export async function getChatRoom(
  doc: QueryDocumentSnapshot<DocumentData, DocumentData>
) {
  const docRef = firebase_getDocRef('conversation', doc.id)
  const conversationSnapshot = await firebase_getDoc(docRef)

  if (conversationSnapshot.exists()) {
    let data = conversationSnapshot.data()
    data = {
      ...data,
      createdAt: data.createdAt.toDate(),
      updateAt: data.updateAt.toDate(),
      messages: data.messages?.map((message: any) => ({
        ...message,
        createdAt: message.createdAt.toDate(),
        updateAt: message.updateAt.toDate(),
      })),
      users: data.users.map((user: any) => ({
        ...user,
        createdAt: user.createdAt.toDate(),
        updateAt: user.updateAt.toDate(),
      })),
    }
    return data as IConversation
  } else {
    return null
  }
}
