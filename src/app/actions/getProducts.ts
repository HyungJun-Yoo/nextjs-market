import { PRODUCTS_PER_PAGE } from '@/constants'
import {
  firebase_getCollection,
  firebase_collection_getDoc,
} from '@/firebase/crud'
import { IProducts } from '@/firebase/type'

import {
  orderBy,
  query,
  where,
  limit,
  startAfter,
  startAt,
} from 'firebase/firestore'

export interface ProductsParams {
  category?: string
  page?: number
  skip?: number
}

interface ConditionProps {
  [key: string]: unknown
}

export default async function getProducts(params: ProductsParams) {
  try {
    const { category, skip = 0 } = params

    const take = PRODUCTS_PER_PAGE

    let condition: ConditionProps = {}

    if (category) {
      condition.category = category
    }

    const ref = firebase_getCollection('products')

    let q
    if (condition.category) {
      q = query(ref, where('category', '==', condition.category))
    }

    const totalItems = (await firebase_collection_getDoc(q ? q : ref)).size

    // q
    //   ? (q = query(
    //       q,
    //       orderBy('createdAt', 'desc'),
    //       limit(take),
    //       // offset(skip)
    //     ))
    //   : (q = query(
    //       ref,
    //       orderBy('createdAt', 'desc'),
    //       // limit(take)
    //     ))

    if (totalItems === 0) {
      return {
        data: [],
        totalItems,
      }
    }

    if (q) {
      const orderedQuery = query(q, orderBy('createdAt', 'desc'))

      if (skip > 0) {
        const skipSnapshot = await firebase_collection_getDoc(orderedQuery)
        const startAfterDocData =
          skipSnapshot.docs.length > skip
            ? skipSnapshot.docs[skip].data()
            : null

        if (startAfterDocData) {
          const startAfterValue = startAfterDocData.createdAt
          q = query(orderedQuery, startAfter(startAfterValue), limit(take))
        } else {
          console.log('No document found at the specified skip position.')
        }
      } else {
        q = query(orderedQuery, limit(take))
      }
    } else {
      // If there's no category condition
      // Here we assume that we want to paginate through all documents in descending order of creation time.
      const orderedRef = query(ref, orderBy('createdAt', 'desc'))
      if (skip > 0) {
        const skipSnapshot = await firebase_collection_getDoc(orderedRef)
        const startAfterDocData =
          skipSnapshot.docs.length > skip
            ? skipSnapshot.docs[skip].data()
            : null

        if (startAfterDocData) {
          const startAfterValue = startAfterDocData.createdAt
          q = query(orderedRef, startAt(startAfterValue), limit(take))
        } else {
          console.log('No document found at the specified offset position.')
        }
      } else {
        // If there's no offset value specified.
        q = query(orderedRef, limit(take))
      }
    }

    const querySnapshot = await firebase_collection_getDoc(q!)

    let products: Array<IProducts> = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      // console.log('data', data)
      products.push({
        ...data,
        createdAt: data.createdAt.toDate(),
        updateAt: data.updateAt.toDate(),
      } as IProducts)
    })

    return {
      data: products as Array<IProducts>,
      totalItems,
    }
  } catch (error) {
    console.log('error', error)
  }
}
