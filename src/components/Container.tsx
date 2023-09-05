import React from 'react'

interface ContainerProps {
  children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div
      className='
        max-w-[2520px]
        mx-auto
        xl:px-20
        md:px-20
        px-4
        py-6
      '
    >
      {children}
    </div>
  )
}

export default Container
