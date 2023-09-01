import bcrypt from 'bcryptjs'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { NextResponse } from 'next/server'
import uuid from 'react-uuid'

export async function POST(request: Request) {
  const body = await request.json()

  const {
    id = uuid(),
    name,
    email,
    image = '',
    password,
    createdAt = Date.now(),
    userType = 'User',
  } = body

  const hashedPassword = await bcrypt.hash(password, 12)

  // db에 데이터 삽입 부분
  const docRef = doc(db, 'users', email)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return NextResponse.json({ error: 'The email is already registered' }, { status: 409 })
  }

  await setDoc(docRef, {
    id,
    name,
    email,
    image,
    password: hashedPassword,
    createdAt,
    userType,
  })

  const snapshot = await getDoc(docRef)
  return NextResponse.json(snapshot.data())
}
