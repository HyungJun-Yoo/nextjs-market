import getCurrentUser from '@/app/actions/getCurrentUser'
import getProductById from '@/app/actions/getProductById'
import EmptyState from '@/components/EmptyState'
import React from 'react'
import ProductClient from './ProductClient'
import { IProducts, IUser } from '@/firebase/type'

interface Params {
  productId?: string
}

const ProductPage = async ({ params }: { params: Params }) => {
  const product = await getProductById(params)
  const currentUser = await getCurrentUser()

  if (!product) {
    return <EmptyState />
  }

  return (
    <ProductClient
      product={product as IProducts & { user: IUser }}
      currentUser={currentUser}
    />
  )
}

export default ProductPage
