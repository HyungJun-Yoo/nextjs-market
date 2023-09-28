import getCurrentUser from '@/app/actions/getCurrentUser'
import {
  firebase_collection_getDoc,
  firebase_getCollection,
  firebase_getDocRef,
  firebase_updateDoc,
} from '@/firebase/crud'
import { Timestamp, arrayUnion, query, where } from 'firebase/firestore'
import { NextResponse } from 'next/server'
import uuid from 'react-uuid'

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.error()
  }

  const { text, image, chatId, receiverId, senderId } = await request.json()

  const conversationRef = firebase_getCollection('conversation')
  const conversationQuery = query(conversationRef, where('id', '==', chatId))

  const conversationSnapshot = await firebase_collection_getDoc(
    conversationQuery
  )

  if (!conversationSnapshot.empty) {
    const docRef = firebase_getDocRef(
      'conversation',
      conversationSnapshot.docs[0].id
    )

    try {
      const updateDoc = await firebase_updateDoc(docRef, {
        messages: arrayUnion({
          id: uuid(),
          text,
          image,
          sender: senderId,
          receiver: receiverId,
          createdAt: Timestamp.fromDate(new Date()),
          updateAt: Timestamp.fromDate(new Date()),
        }),
      })

      return NextResponse.json(updateDoc)
    } catch (error) {
      return NextResponse.error()
    }
  }

  return NextResponse.error()
}
