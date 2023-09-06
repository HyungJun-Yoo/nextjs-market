'use client'
import Button from '@/components/Button'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import ImageUpload from '@/components/ImageUpload'
import Input from '@/components/Input'
import { categories } from '@/components/categories/Categories'
import CategoryInput from '@/components/categories/CategoryInput'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form'

const ProductUploadPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      mapInfo: {
        latitude: 37.55270438353857,
        longitude: 126.9728280726901,
      },
      imageSrc: '',
      price: 1,
    },
  })

  const KakaoMap = dynamic(() => import('@/components/KakaoMap'), {
    ssr: false,
    loading: () => <div className='w-full h-[360px]'></div>,
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios
      .post('/api/products', data)
      .then((response) => {
        router.push(`/products/${response.data}`)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
          <Heading title='Product Upload' subtitle='upload your product' />
          <Controller
            name='imageSrc'
            control={control}
            render={({ field: { onChange, value } }) => (
              <ImageUpload
                onChange={(value) => onChange(value)}
                value={value}
              />
            )}
          />

          <Controller
            name='title'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                id='title'
                label='title'
                disabled={isLoading}
                errors={errors}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e.target.value)
                }
              />
            )}
            rules={{ required: true }}
          />

          <hr />

          <Controller
            name='description'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                id='description'
                label='description'
                disabled={isLoading}
                errors={errors}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e.target.value)
                }
              />
            )}
            rules={{ required: true }}
          />
          <hr />

          <Controller
            name='price'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                id='price'
                label='price'
                disabled={isLoading}
                errors={errors}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e.target.value)
                }
              />
            )}
            rules={{ required: true }}
          />
          <hr />

          <div
            className='
                  grid 
                  grid-cols-1 
                  md:grid-cols-2 
                  gap-3 
                  max-h-[50vh] 
                  autoflow-y-auto'
          >
            <>
              {categories.map((item) => {
                return (
                  <div key={item.label} className='col-span-1'>
                    <Controller
                      name='category'
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CategoryInput
                          onClick={onChange}
                          selected={value === item.path}
                          label={item.label}
                          icon={item.icon}
                          path={item.path}
                        />
                      )}
                    />
                  </div>
                )
              })}
            </>
          </div>
          <hr />

          <Controller
            name='mapInfo'
            control={control}
            render={({ field: { onChange, value } }) => (
              <KakaoMap data={value} onChange={onChange} />
            )}
          />

          <Button label='상품 생성하기' />
        </form>
      </div>
    </Container>
  )
}

export default ProductUploadPage
