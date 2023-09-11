import getCurrentUser from '@/app/actions/getCurrentUser'
import { firebase_getDocRef, firebase_updateDoc } from '@/firebase/crud'
import { NextResponse } from 'next/server'

interface Params {
  productId?: string
}

export async function POST(request: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { productId } = params

  if (!productId || typeof productId !== 'string') {
    throw new Error('Invalid Id')
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])]

  favoriteIds.push(productId)

  const docRef = firebase_getDocRef('users', currentUser.email)
  const user = await firebase_updateDoc(docRef, {
    favoriteIds,
  })

  return NextResponse.json(user)
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { productId } = params

  if (!productId || typeof productId !== 'string') {
    throw new Error('Invalid Id')
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])]

  favoriteIds = favoriteIds.filter((id) => id !== productId)

  const docRef = firebase_getDocRef('users', currentUser.email)
  const user = await firebase_updateDoc(docRef, {
    favoriteIds,
  })

  return NextResponse.json(user)
}
