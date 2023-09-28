import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import ChatClient from './ChatClient'
import Button from '@/components/Button'
import Link from 'next/link'

const Chatpage = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return (
      <div className='flex justify-center h-screen'>
        <Link href='auth/login' className='flex items-center h-1/2'>
          <Button label='로그인 이후 채팅이 가능합니다' />
        </Link>
      </div>
    )
  }

  return <ChatClient currentUser={currentUser} />
}

export default Chatpage
