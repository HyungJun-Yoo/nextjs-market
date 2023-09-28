import { IConversation } from '@/firebase/type'
import React from 'react'
import User from './User'

interface ContactsProps {
  users: IConversation[]
  setLayout: (layout: boolean) => void
  setReceiver: (receiver: {
    chatId: string
    receiverId: string
    receiverName: string
    receiverImage: string
  }) => void
}

const Contacts = ({ users, setLayout, setReceiver }: ContactsProps) => {
  const filterMessages = (
    chatId: string,
    userId: string,
    userName: string | null,
    userImage: string | null
  ) => {
    setReceiver({
      chatId,
      receiverId: userId,
      receiverName: userName || '',
      receiverImage: userImage || '',
    })
  }

  return (
    <div className='w-full overflow-auto h-[calc(100vh_-_56px)] border-[1px]'>
      <h1 className='m-4 text-2xl font-semibold'>Chat</h1>
      <hr />
      <div className='flex flex-col'>
        {users.length > 0 &&
          users.map((user) => {
            return (
              <div
                key={user.id}
                onClick={() => {
                  filterMessages(
                    user.id,
                    user.opponentUser.email,
                    user.opponentUser.name,
                    user.opponentUser.image
                  )
                  setLayout(true)
                }}
              >
                <User user={user} />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Contacts
