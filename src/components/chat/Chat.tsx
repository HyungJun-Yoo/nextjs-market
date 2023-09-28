import { IConversation, IUser } from '@/firebase/type'
import React, { useEffect, useRef } from 'react'
import Input from './Input'
import ChatHeader from './ChatHeader'
import Message from './Message'

interface ChatProps {
  users: IConversation[]
  currentUser: IUser
  receiver: {
    chatId: string
    receiverId: string
    receiverName: string
    receiverImage: string
  }
  setLayout: (layout: boolean) => void
}

const Chat = ({ users, currentUser, receiver, setLayout }: ChatProps) => {
  const messageEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messageEndRef?.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }
  useEffect(() => {
    scrollToBottom()
  })

  const conversation = users.find((user) => {
    if (
      user.senderId === currentUser.email ||
      user.receiverId === currentUser.email
    ) {
      if (
        user.senderId === receiver.receiverId ||
        user.receiverId === receiver.receiverId
      ) {
        return user
      }
    }
  })

  if (!receiver.receiverName || !currentUser) {
    return <div className='w-full h-full'></div>
  }

  return (
    <div className='w-full'>
      <div>
        <ChatHeader
          setLayout={setLayout}
          receiverName={receiver.receiverName}
          receiverImage={receiver.receiverImage}
          lastMessageTime={
            conversation?.messages
              .filter((message) => message.receiver === currentUser.email)
              .slice(-1)[0]?.updateAt
          }
        />
      </div>

      <div className='flex flex-col gap-8 p-4 overflow-auto h-[calc(100vh_-_60px_-_70px_-_80px)]'>
        {conversation &&
          conversation.messages.map((message) => {
            return (
              <Message
                key={message.id}
                isSender={message.sender === currentUser.email}
                messageText={message.text}
                messageImage={message.image}
                receiverName={receiver.receiverName}
                receiverImage={receiver.receiverImage}
                senderImage={currentUser?.image}
                time={message.updateAt}
              />
            )
          })}
        <div ref={messageEndRef} />
      </div>

      <div>
        <Input
          chatId={receiver.chatId}
          receiverId={receiver.receiverId}
          currentUserId={currentUser.email}
        />
      </div>
    </div>
  )
}

export default Chat
