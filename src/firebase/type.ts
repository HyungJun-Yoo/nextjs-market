export interface IUser {
  id: string
  name: string
  email: string
  image: string
  password: string
  userType: string
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
  mapinfo: {
    latitude: number
    longitude: number
  }
  createdAt: Date
  updateAt: Date
}
