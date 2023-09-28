export interface IUser {
  id: string
  name: string
  email: string
  image: string
  password: string
  userType: string
  favoriteIds: string[]
  createdAt: Date
  updateAt: Date
}

export interface IProducts {
  id: string
  title: string
  description: string
  imageSrc: string
  category: string
  userId: string
  price: number
  latitude: number
  longitude: number
  createdAt: Date
  updateAt: Date
}

export interface IConversation {
  id: string
  name?: string
  senderId: string
  receiverId: string
  users: IUser[]
  messages: IMessage[]
  createdAt: Date
  updateAt: Date
  opponentUser: IUser
}

export interface IMessage {
  id: string
  createdAt: Date
  updateAt: Date
  text?: string
  image?: string
  sender: string
  receiver: string
}
