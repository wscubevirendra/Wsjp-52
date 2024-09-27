import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { context } from '../Maincontext'



export default function Header() {
    const { cart } = useContext(context)
    return (
        <div className='w-full flex gap-20  bg-[white] border-b mb-6 text-[black] p-4 shadow-lg text-[30px] font-bold'>
            <Link to="/cart">
                <h1>cart:{cart.length}</h1>
            </Link>
            <Link to="/">
                <h1>Listing</h1>
            </Link>
        </div>
    )
}
