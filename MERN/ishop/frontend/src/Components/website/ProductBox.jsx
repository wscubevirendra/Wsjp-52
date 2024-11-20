import React from 'react'
import { useDispatch } from "react-redux"
import { addToCart } from '../../redux/reducers/Cartslice'

export default function ProductBox(product) {
    const dispatched = useDispatch()


    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-200 bg-white">
            <img
                className="w-full h-48 object-cover"
                src={"http://localhost:5000/images/product/" + product.main_image}
                alt={""}
            />
            <div className="px-4 py-3">
                <h2 className="font-bold text-lg text-gray-800">{product.name}</h2>
                <div className="flex items-center mt-2 space-x-2">
                    <span className="text-gray-500 line-through">
                        ₹{product.original_price}
                    </span>
                    <span className="text-xl font-semibold text-green-600">
                        ₹{product.final_price}
                    </span>
                </div>

                <button onClick={() => {
                    dispatched(addToCart(
                        {
                            product_id: product._id,
                            price: product.final_price,
                            original_price: product.original_price
                        }
                    ))
                }} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Add to Cart
                </button>
            </div>
        </div>
    )
}
