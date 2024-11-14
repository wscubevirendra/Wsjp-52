import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../../Context'
import { useParams } from 'react-router-dom'
import axios from 'axios'



export default function MultipleImages() {
  const { notify, API_BASE_URL, PRODUCT_URL } = useContext(MainContext)
  const { product_id } = useParams()
  const [currentImages, SetcurrentImages] = useState([])

  const submitHandler = (e) => {
    e.preventDefault()
    const formdata = new FormData();

    for (let images of e.target.other_images.files) {
      formdata.append("others_images", images)

    }

   


    axios.post(API_BASE_URL + PRODUCT_URL + "/multiple-images/" + product_id, formdata).then(
      (succes) => {
        notify(succes.data.msg, succes.data.status)
        if (succes.data.status == 1) {
          e.target.reset()
        }

      }


    ).catch(
      (error) => {
        notify("Internal Server Error", 0)

      }
    )

  }

  useEffect(
    () => {
      axios.get(API_BASE_URL + PRODUCT_URL + "/" + product_id).then(
        (succes) => {
          SetcurrentImages(succes.data.Product.others_images)
        }

      ).catch(
        (errror) => {
          console.log(errror)

        }
      )
    },
    [product_id]
  )

  return (
    <div className='px-2 pt-2 w-full shadow-sm bg-white'>
      <section className="bg-white">
        <nav className="flex ml-5" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 "
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Admin
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="#"
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 "
                >
                  Product
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                  Multiple-images-add
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <div className="py-8 px-4 mx-auto max-w-4xl lg:py-10">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Add a new product
          </h2>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

              <div className='col-span-2' >
                <label
                  htmlFor="other_images"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product image
                </label>
                <input
                  type="file"
                  name="other_images"
                  id="other_images"
                  multiple
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type other_images"
                />
              </div>

            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 bg-blue-600 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
            >
              Save
            </button>
          </form>
          <h3>Current Images</h3>
          <div className='flex'>
           
          {
            currentImages.map(
              (img,index)=>{
                return  <img width="60" src={API_BASE_URL + "/images/product/" + img} alt="" />

              }
            )
          }
          </div>
        </div>
      </section>

    </div>
  )
}
