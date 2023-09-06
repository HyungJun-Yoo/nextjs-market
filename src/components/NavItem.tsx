import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { IUser } from '@/firebase/type'

interface NavItemProps {
  mobile?: boolean
  currentUser?: IUser | null
}

const NavItem = ({ mobile, currentUser }: NavItemProps) => {
  return (
    <ul
      className={`text-md justify-center flex gap-4 w-full items-center ${
        mobile && 'flex-col h-full'
      }`}
    >
      <li className='text-center cursor-pointer'>
        <Link href='/admin' className='block w-full h-full border-b-4 py-2'>
          Admin
        </Link>
      </li>
      <li className='text-center cursor-pointer'>
        <Link href='/user' className='block w-full h-full border-b-4 py-2'>
          User
        </Link>
      </li>

      {currentUser ? (
        <li className='text-center cursor-pointer'>
          <button onClick={() => signOut()} className='py-2 border-b-4'>
            Signout
          </button>
        </li>
      ) : (
        <li className='text-center cursor-pointer'>
          {/* <button onClick={() => signIn()}>Signin</button> */}
          <Link href='/auth/login' className='py-2 border-b-4'>
            Signin
          </Link>
        </li>
      )}
    </ul>
  )
}

export default NavItem
