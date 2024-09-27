import React, { useContext } from 'react'
import { context } from '../Maincontext'
import { Link } from 'react-router-dom'



export default function Cart() {
    const { cart, removeFromCart } = useContext(context)
    return (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {
                cart.map(
                    (data, index) => {
                        return (
                            <div>
                                <div key={index} className="group relative">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <img src={data.thumbnail} alt={data.title} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <Link to={"/details/" + data.id}>
                                                    <span aria-hidden="true" className="absolute inset-0"></span>
                                                    {data.title}
                                                </Link>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">Rating- {data.rating}</p>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">${data.price}</p>
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(data.id)} type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Remove</button>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}
