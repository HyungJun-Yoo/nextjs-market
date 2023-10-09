import getCurrentUser from '@/app/actions/getCurrentUser'
import {
  firebase_getCollection,
  firebase_collection_addDoc,
} from '@/firebase/crud'
import { NextResponse } from 'next/server'
import uuid from 'react-uuid'

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()
  const { title, description, imageSrc, category, mapInfo, price } = body

  const { latitude, longitude } = mapInfo

  Object.keys(body).forEach((value) => {
    if (!body[value]) {
      return NextResponse.error()
    }
  })

  const ref = firebase_getCollection('products')
  const productId = uuid()
  const products = await firebase_collection_addDoc(ref, {
    id: productId,
    title,
    description,
    imageSrc,
    category,
    latitude,
    longitude,
    price: Number(price),
    userId: currentUser.id,
  })

  if (!products) return NextResponse.error()
  return NextResponse.json(productId)
}
