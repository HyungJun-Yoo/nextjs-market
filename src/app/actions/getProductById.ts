import { query, where } from 'firebase/firestore'
import {
  firebase_getCollection,
  firebase_collection_getDoc,
} from '@/firebase/crud'

interface Params {
  productId?: string
}

export default async function getProductById(params: Params) {
  try {
    const { productId } = params
    if (!productId) return null

    const productsRef = firebase_getCollection('products')
    const productsQuery = query(productsRef, where('id', '==', productId))
    const productsSnapshot = await firebase_collection_getDoc(productsQuery)

    console.log('productsData', productsSnapshot.empty)
    if (productsSnapshot.empty) return null
    const productsData = productsSnapshot.docs[0].data()
    const usersRef = firebase_getCollection('users')
    const usersQuery = query(usersRef, where('id', '==', productsData.userId))
    const usersSnapshot = await firebase_collection_getDoc(usersQuery)
    const usersData = usersSnapshot.docs[0].data()

    return {
      ...productsData,
      createdAt: productsData.createdAt.toDate(),
      updateAt: productsData.updateAt.toDate(),
      user: {
        ...usersData,
        createdAt: usersData.createdAt.toDate(),
        updateAt: usersData.updateAt.toDate(),
      },
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
