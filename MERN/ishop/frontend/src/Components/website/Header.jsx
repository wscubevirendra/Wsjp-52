import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux"



export default function Header() {
  const cart = useSelector((state) => state.cart.data)
  const user = useSelector((state) => state.user)
  console.log(cart)
  return (
    <>
      <div className='bg-[#FFFFFF]  py-3 w-full shadow-md'>
        <div className='max-w-[1200px] text-[#262626] text-[17px] font-[700] mx-auto flex  gap-10 justify-end'>
          {
            user.data == null ?
              <Link to="/login?ref=header">
                <div className='flex cursor-pointer justify-center items-center gap-2'>
                  Login
                </div>
              </Link>
              :
              <div className='flex cursor-pointer justify-center items-center gap-2'>
                Logout
              </div>

          }

          <Link to="/profile">
            <div className='flex cursor-pointer justify-center items-center gap-2'>
              <FaRegUser />
              My Profile
            </div>
          </Link>
          <Link to="/cart">
            <div className='flex cursor-pointer justify-center items-center gap-2'>
              <BsCartPlus />
              Items({cart.length})
            </div>
          </Link>


        </div>
      </div>

      <div className='max-w-[1200px]  p-2 mx-auto'>
        <div className='flex my-2 justify-center items-center'>
          <img src="images/logo.svg" alt="" />
        </div>
        <nav className='my-10'>
          <ul className='flex gap-20 text-[#22262A] text-[14px] font-[700] justify-center items-center'>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/store">STORE</Link>
            </li>
            <li>
              <Link>IPHONE</Link>
            </li>
            <li>
              <Link>IPAD</Link>
            </li>
            <li>
              <Link>MACBOOK</Link>
            </li>
            <li>
              <Link>ACCESORIES</Link>
            </li>
          </ul>
        </nav>

      </div>

    </>

  )
}
