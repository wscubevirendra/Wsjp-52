import React, { useEffect } from 'react'
import { RiDashboard2Fill } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { TbCategoryPlus } from "react-icons/tb";
import { FaProductHunt } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../redux/reducers/Adminslice';


export default function SideMenu() {
    const navigate = useNavigate()
    const dispatched = useDispatch()
    const admin = useSelector((state) => state.admin.data);

    useEffect(
        () => {
            const lsAdmin = localStorage.getItem("admin")
            const lsAdmin_token = localStorage.getItem("admin-token")
            if (lsAdmin) {
                dispatched(
                    login(
                        {
                            data: JSON.parse(lsAdmin),
                            token: lsAdmin_token
                        }
                    )
                )
            }

        }
        ,
        []
    )

    useEffect(
        () => {
            const lsAdmin = localStorage.getItem("admin")
            if (admin == null && lsAdmin == undefined) {
                navigate('/admin/login')
            }
        },
        [admin]
    )


    const menu = [
        {
            url: "/admin",
            name: "DashBaord",
            icons: <RiDashboard2Fill />
        },
        {
            url: "/admin/category",
            name: "category",
            icons: <BiCategoryAlt />
        },
        {
            url: "/admin/color",
            name: "color",
            icons: <TbCategoryPlus />

        },
        {
            url: "/admin/product",
            name: "product",
            icons: <FaProductHunt />

        }
    ]
    return (
        <div className='bg-gray-700 min-h-[100vh]'>
            <h1 className='text-white text-2xl text-center py-4'>Admin Panel</h1>
            <hr />
            <ul className='mt-5 px-4 text-xl text-white'>
                {
                    menu.map(
                        (d, i) => {
                            return (
                                <Link key={i} to={d.url} className=''>
                                    <li className='flex  mb-6 items-center gap-4'>
                                        {d.icons}
                                        <span className=' duration-500 hover:translate-x-1 '>{d.name}</span>
                                    </li>

                                </Link>

                            )
                        }
                    )
                }
                <li onClick={() => dispatched(logout())} className='flex cursor-pointer  mb-6 items-center gap-4'>
                    <IoIosLogOut />
                    <span className=' duration-500 hover:translate-x-1 '>Logout</span>
                </li>

            </ul>

        </div>
    )
}
