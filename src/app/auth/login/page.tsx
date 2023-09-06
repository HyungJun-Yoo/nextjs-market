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
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Alert from '@/components/Alert'

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState('')
  const router = useRouter()

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsLoading(true)
    try {
      const data = await signIn('credentials', { redirect: false, ...body })
      // const data = await signIn('credentials', body)
      if (data?.error) setAlert('Invalid credentials')
      else {
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      console.log(error)
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
        <h1 className='text-2xl'>Login</h1>

        <Controller
          name='email'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id='email'
              label='email'
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

        {alert.length > 0 && <Alert message={alert} />}

        <Button label='Login' />
        <div className='text-center'>
          <p className='text-gray-400'>
            Not a member?{' '}
            <Link href='/auth/register' className='text-black hover:underline'>
              Register
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}

export default LoginPage
