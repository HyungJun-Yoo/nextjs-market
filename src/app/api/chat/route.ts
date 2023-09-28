import getUser from '@/app/actions/getUser'
import {
  firebase_collection_addDoc,
  firebase_collection_getDoc,
  firebase_getCollection,
  firebase_getDocRef,
  firebase_updateDoc,
} from '@/firebase/crud'
import { or, query, where } from 'firebase/firestore'
import { NextResponse } from 'next/server'
import uuid from 'react-uuid'

interface chatData {
  myEmail: string
  yourEmail: string
}

export async function POST(request: Request) {
  const { myEmail, yourEmail }: chatData = await request.json()

  const myInfo = await getUser(myEmail)
  const yourInfo = await getUser(yourEmail)

  const conversationRef = firebase_getCollection('conversation')
  const conversationQuery = query(
    conversationRef,
    where('senderId', 'in', [myEmail, yourEmail]),
    where('receiverId', 'in', [myEmail, yourEmail])
  )

  const conversationSnapshot = await firebase_collection_getDoc(
    conversationQuery
  )

  let data
  if (conversationSnapshot.empty) {
    data = await firebase_collection_addDoc(conversationRef, {
      id: uuid(),
      name: null,
      senderId: myEmail,
      receiverId: yourEmail,
      users: [myInfo, yourInfo],
      messages: [],
    })
  } else {
    const docRef = firebase_getDocRef(
      'conversation',
      conversationSnapshot.docs[0].id
    )
    data = firebase_updateDoc(docRef, {
      users: [myInfo, yourInfo],
    })
  }

  return NextResponse.json(data)
}
