import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import uuid from 'react-uuid'
import {
  firebase_getDocRef,
  firebase_getDoc,
  firebase_setDoc,
} from '@/firebase/crud'

export async function POST(request: Request) {
  const body = await request.json()

  const {
    id = uuid(),
    name,
    email,
    image = '',
    password,
    userType = 'User',
    favoriteIds = [],
  } = body

  const hashedPassword = await bcrypt.hash(password, 12)

  // db에 데이터 삽입 부분
  const docRef = firebase_getDocRef('users', email)
  const docSnap = await firebase_getDoc(docRef)
  if (docSnap.exists()) {
    return NextResponse.json(
      { error: 'The email is already registered' },
      { status: 409 }
    )
  }

  await firebase_setDoc(docRef, {
    id,
    name,
    email,
    image,
    password: hashedPassword,
    userType,
    favoriteIds,
  })

  const snapshot = await firebase_getDoc(docRef)
  return NextResponse.json(snapshot.data())
}
