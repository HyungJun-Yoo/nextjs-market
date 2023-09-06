import getCurrentUser from '@/app/actions/getCurrentUser'
import { firebase_getCollection, firebase_addDoc } from '@/firebase/crud'
import { NextResponse } from 'next/server'

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
  const products = await firebase_addDoc(ref, {
    data: {
      title,
      description,
      imageSrc,
      category,
      latitude,
      longitude,
      price: Number(price),
      userId: currentUser.id,
    },
  })

  return NextResponse.json(products)
}
