'use client'
import Link from 'next/link'
import Button from '@/components/Button'
import Input from '@/components/Input'
import React, { useState } from 'react'
import {
  useForm,
  FieldValues,
  SubmitHandler,
  Controller,
} from 'react-hook-form'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsLoading(true)
    try {
      const { data } = await axios.post('/api/register', body)
      router.push('/auth/login')
    } catch (error) {
      console.log(error)
      // alert(axiosError?.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='grid h-[calc(100vh_-_56px)] place-items-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-center gap-4 min-w-[350px]'
      >
        <h1 className='text-2xl'>Register</h1>
        <Controller
          name='email'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id='email'
              label='Email'
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

        <Controller
          name='name'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id='name'
              label='name'
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

        <Controller
          name='password'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id='password'
              label='password'
              type='password'
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

        <Button label='Register' />
        <div className='text-center'>
          <p className='text-gray-400'>
            Already a member?{' '}
            <Link href='/auth/login' className='text-black hover:underline'>
              Login
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}

export default RegisterPage
