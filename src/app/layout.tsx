import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import getCurrentUser from '@/app/actions/getCurrentUser'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  console.log('root', currentUser)
  return (
    <html lang='ko'>
      <body className={inter.className}>
        <Navbar currentUser={currentUser} />
        {children}
        <Script src='//dapi.kakao.com/v2/maps/sdk.js?appkey=73c7d960208d7b380b360e9382f0bb6b&libraries=services,clusterer&autoload=false' />
      </body>
    </html>
  )
}
