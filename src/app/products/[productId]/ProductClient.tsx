'use client'
import Button from '@/components/Button'
import Container from '@/components/Container'
import { categories } from '@/components/categories/Categories'
import ProductHead from '@/components/products/ProductHead'
import ProductInfo from '@/components/products/ProductInfo'
import { IProducts, IUser } from '@/firebase/type'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React from 'react'

interface ProductClientProps {
  product: IProducts & { user: IUser }
  currentUser: IUser | null
}

const ProductClient = ({ product, currentUser }: ProductClientProps) => {
  const router = useRouter()
  const KakaoMap = dynamic(() => import('@/components/KakaoMap'), {
    ssr: false,
    loading: () => <div className='w-full h-[360px]'></div>,
  })

  const mapInfo = {
    latitude: product.latitude,
    longitude: product.longitude,
  }

  const category = categories.find((item) => item.path === product.category)

  const chatClick = async () => {
    const chatData = {
      myEmail: currentUser!.email,
      yourEmail: product.user.email,
    }

    const res = await axios.post('/api/chat', chatData)
    if (res) {
      router.push('/chat')
    }
  }

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ProductHead
            title={product.title}
            imageSrc={product.imageSrc}
            id={product.id}
            currentUser={currentUser}
          />
          <div className='grid grid-cols-1 mt-6 md:grid-cols-2 md:gap-10'>
            <ProductInfo
              user={product.user}
              category={category}
              createdAt={product.createdAt}
              description={product.description}
            />
            <div>
              <KakaoMap detailPage data={mapInfo} />
            </div>
          </div>
        </div>
        <div className='mt-10'>
          {currentUser ? (
            currentUser.email === product.user.email ? (
              ''
            ) : (
              <Button label='이 유저와 채팅하기' onClick={chatClick} />
            )
          ) : (
            <Button
              label='로그인 이후 채팅이 가능합니다'
              onClick={() => router.push('/auth/login')}
            />
          )}
        </div>
      </div>
    </Container>
  )
}

export default ProductClient
