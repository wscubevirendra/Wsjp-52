import React, { useContext, useEffect } from 'react'
import { AiOutlineHeart, AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { MainContext } from '../../Context';
import { useSelector } from "react-redux"
import { formatToIndianCurrency } from '../../helper'
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { product, fetchProduct } = useContext(MainContext)
  const cart = useSelector((state) => state.cart)
  console.log(cart)
  const user = useSelector((state) => state.user)
  const navigate = useNavigate();

  const CheckUserLogin = () => {
    if (user) {
      navigate("/checkout")
    } else {
      navigate("/login?ref=checkout")

    }
  }



  useEffect(
    () => {
      fetchProduct()
    },
    []
  )
  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Shopping Cart
        </h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {
                (product.length != 0 && cart.data.length != 0)
                &&
                cart.data.map(
                  (d, i) => {
                    const prod = product.find((p) => p._id == d.product_id)
                    return (

                      < div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6" >
                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                          <a href="#" className="shrink-0 md:order-1">
                            <img
                              className="h-20 w-20"
                              src={`http://localhost:5000/images/product/${prod?.main_image}`}
                              alt="imac image"
                            />
                          </a>
                          <label htmlFor="counter-input" className="sr-only">
                            Choose quantity:
                          </label>
                          <div className="flex items-center justify-between md:order-3 md:justify-end">
                            <div className="flex items-center">
                              <button
                                type="button"
                                id="decrement-button"
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                              >
                                <AiOutlineMinus className="h-4 w-4 text-gray-900" />
                              </button>
                              <input
                                type="text"
                                id="counter-input"
                                className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                                defaultValue={d.qty}
                                required
                              />
                              <button
                                type="button"
                                id="increment-button"
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                              >
                                <AiOutlinePlus className="h-4 w-4 text-gray-900" />
                              </button>
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                              <p className="text-base font-bold text-gray-900">
                                {
                                  formatToIndianCurrency(prod.final_price * d.qty)
                                }
                              </p>
                            </div>
                          </div>
                          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <a
                              href="#"
                              className="text-base font-medium text-gray-900 hover:underline"
                            >
                              {prod.name}
                              <br />
                              <span>{formatToIndianCurrency(prod.final_price)}</span>
                            </a>
                            <div className="flex items-center gap-4">

                              <button
                                type="button"
                                className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                              >
                                <AiOutlineClose className="mr-1.5 h-5 w-5" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                    )
                  }
                )
              }


            </div>
          </div>
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <p className="text-xl font-semibold text-gray-900">
                Order summary
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">
                      Original price
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      {formatToIndianCurrency(cart?.original_price)}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">
                      Savings
                    </dt>
                    <dd className="text-base font-medium text-green-600">
                      {formatToIndianCurrency(cart?.original_price - cart.total)}
                    </dd>
                  </dl>

                </div>
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                  <dt className="text-base font-bold text-gray-900">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900">
                    {formatToIndianCurrency(cart.total)}
                  </dd>
                </dl>
              </div>
              <button
                onClick={CheckUserLogin}
                className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium bg-blue-600 text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section >


  )
}
