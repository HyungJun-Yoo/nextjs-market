'use client'
import Contacts from '@/components/chat/Contacts'
import {
  firebase_collection_getDoc,
  firebase_getCollection,
} from '@/firebase/crud'
import { IConversation, IUser } from '@/firebase/type'
import { onSnapshot, or, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { getChatRoom } from '../actions/getChatRoom'
import Chat from '@/components/chat/Chat'
import useSWR, { mutate } from 'swr'

interface ChatClient {
  currentUser: IUser
}

const ChatClient = ({ currentUser }: ChatClient) => {
  const [receiver, setReceiver] = useState({
    chatId: '',
    receiverId: '',
    receiverName: '',
    receiverImage: '',
  })

  const [layout, setLayout] = useState(false)
  const [users, setUsers] = useState<IConversation[]>([])

  useEffect(() => {
    const q = query(
      firebase_getCollection('conversation'),
      or(
        where('senderId', '==', currentUser.email),
        where('receiverId', '==', currentUser.email)
      ),
      orderBy('updateAt', 'desc')
    )
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const chatRooms = await Promise.all(querySnapshot.docs.map(getChatRoom))
      const updateChatRooms = chatRooms.map((user) => {
        const opponentUser = user?.users.find(
          (item) => item.email !== currentUser.email
        )

        if (!opponentUser) return { ...user }
        return {
          ...user,
          opponentUser,
        }
      })
      setUsers(updateChatRooms as IConversation[])
    })

    return () => {
      unsubscribe() // 컴포넌트 언마운트 시 리스너 해제
    }
  }, [currentUser.email])

  return (
    <main>
      <div className='grid grid-cols-[1fr] md:grid-cols-[300px_1fr]'>
        {/* md 보다 클 때는 둘 다 보여야 함 */}
        {/* md 보다 작고 layout이 true 일 때는 contact 안보임 */}
        <section className={`md:flex ${layout && 'hidden'}`}>
          <Contacts
            users={users}
            setLayout={setLayout}
            setReceiver={setReceiver}
          />
        </section>

        {/* md 보다 클 때는 둘 다 보여야 함 */}
        {/* md 보다 작고 layout이 false 일 때는 chat 안보임 */}
        <section className={`md:flex ${!layout && 'hidden'}`}>
          <Chat
            users={users}
            currentUser={currentUser}
            receiver={receiver}
            setLayout={setLayout}
          />
        </section>
      </div>
    </main>
  )
}

export default ChatClient
