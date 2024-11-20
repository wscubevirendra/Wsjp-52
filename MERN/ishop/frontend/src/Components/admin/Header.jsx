import React from 'react'
import { useSelector } from 'react-redux'

export default function Header() {
  const admin = useSelector((state) => state.admin.data?.name)
  return (
    <div className='shadow-2xl  border-b-2  w-full  bg-white py-5 px-2 text-green-800 font-bold '>Hellow: {admin}</div>

  )
}
