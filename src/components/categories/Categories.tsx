import React from 'react'
import { BiBed, BiFemale, BiGlasses } from 'react-icons/bi'
import { FaDigitalTachograph } from 'react-icons/fa'
import { ImMan, ImWoman } from 'react-icons/im'
import { GiBoatFishing } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import { AiFillCar } from 'react-icons/ai'

export const categories = [
  {
    label: '디지털기기',
    path: 'digital',
    icon: FaDigitalTachograph,
    description: '디지털기기 카테고리입니다.',
  },
  {
    label: '생활가전',
    path: 'appliances',
    icon: BiBed,
    description: '생활가전 카테고리입니다.',
  },
  {
    label: '가구/인테리어',
    path: 'interior',
    icon: MdOutlineVilla,
    description: '가구/인테리어 카테고리입니다.',
  },
  {
    label: '여성의류',
    path: 'women-clothing',
    icon: ImWoman,
    description: '여성의류 카테고리입니다.',
  },
  {
    label: '남성패션/잡화',
    path: 'men-fashion',
    icon: ImMan,
    description: '남성패션/잡화 카테고리입니다.',
  },
  {
    label: '뷰티/미용',
    path: 'beauty',
    icon: BiGlasses,
    description: '뷰티/미용 카테고리입니다.',
  },
  {
    label: '스포츠/레저',
    path: 'sport',
    icon: GiBoatFishing,
    description: '스포츠/레저 카테고리입니다.',
  },
  {
    label: '중고차',
    path: 'used-car',
    icon: AiFillCar,
    description: '중고차 카테고리입니다.',
  },
]

const Categories = () => {
  return <div>Categories</div>
}

export default Categories
