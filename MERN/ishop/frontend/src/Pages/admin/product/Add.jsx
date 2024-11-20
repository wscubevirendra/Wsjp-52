import React, { useState, useEffect, useContext, useRef } from 'react'
import { MainContext } from '../../../Context';
import Select from 'react-select'
import axios from 'axios';



export default function Add() {
  const { notify, API_BASE_URL, CATEGORY_URL, fetchCategory, category, COLOR_URL, fetchColor, color, PRODUCT_URL } = useContext(MainContext)
  const [sel_colors, setSelColors] = useState([])

  const ProductName = useRef();
  const ProductSlug = useRef();
  const OrginalPrice = useRef();
  const DiscountPrice = useRef();
  const FinalPrice = useRef();


  const calFinalPrice = () => {
    const op = OrginalPrice.current.value;
    const dp = DiscountPrice.current.value;

    const final = op - (op * (dp / 100));
    FinalPrice.current.value = final

  }


  function createSlug() {
    const slug = ProductName.current.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+|-+$/g, '')
    ProductSlug.current.value = slug;

  }

  useEffect(
    () => {
      fetchCategory()
      fetchColor()
    },
    []
  )

  const submitHandler = (e) => {
    e.preventDefault()
    const formdata = new FormData();
    formdata.append("name", ProductName.current.value);
    formdata.append("slug", ProductSlug.current.value);
    formdata.append("original_price", OrginalPrice.current.value);
    formdata.append("discount_percentage", DiscountPrice.current.value);
    formdata.append("final_price", FinalPrice.current.value);
    formdata.append("category_id", e.target.category.value);
    formdata.append("colors",JSON.stringify(sel_colors ));
    //arrray to json
    formdata.append("short_description", e.target.short_description.value);
    formdata.append("long_description", e.target.long_description.value);
    formdata.append("main_image", e.target.main_image.files[0] ?? null)

    axios.post(API_BASE_URL + PRODUCT_URL + "/create", formdata).then(
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
                  Add
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
              <div >
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product Name
                </label>
                <input
                  ref={ProductName}
                  onChange={createSlug}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type product name"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="product_slug"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product Slug
                </label>
                <input
                  ref={ProductSlug}
                  type="text"
                  name="product_slug"
                  id="product_slug"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type product_slug "
                  required=""
                />
              </div>

              <div className='grid col-span-2 gap-4 grid-cols-3'>
                <div className="w-full">
                  <label
                    htmlFor="original_price"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Original Price
                  </label>
                  <input
                    ref={OrginalPrice}
                    type="number"
                    name="original_price"
                    id="original_price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="$2999"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="disct_price"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Discountent Price
                  </label>
                  <input
                    ref={DiscountPrice}
                    onChange={calFinalPrice}
                    type="number"
                    name="disct_price"
                    id="disct_price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="%"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="final_price"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Final Price
                  </label>
                  <input
                    ref={FinalPrice}
                    readOnly
                    type="number"
                    name="final_price"
                    id="final_price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="$2999"
                    required=""
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Category
                </label>
                <Select
                  options={
                    category.map(
                      (d, i) => {
                        return { value: d._id, label: d.name }
                      }
                    )
                  }
                  id="category"
                  name="category"
                  className=" w-full p-2.5"
                />

              </div>
              <div>
                <label
                  htmlFor="colors"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Color
                </label>
                <Select
                  onChange={
                    (opt) => {
                      console.log(opt)
                      const d = opt.map(o => o.value)
                      setSelColors(d)
                    }
                  }
                  closeMenuOnSelect={false}
                  isMulti
                  options={
                    color.map(
                      (cat, i) => {
                        return {
                          value: cat._id,
                          label: cat.name
                        }
                      }
                    )
                  }
                  id="color"
                  name="color"
                >
                </Select>

              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="short_description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  id="short_description"
                  name='short_description'
                  rows={3}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Your short description here"
                  defaultValue={""}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="long_description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Long Description
                </label>
                <textarea
                  id="long_description"
                  name='long_description'
                  rows={8}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Your Long description here"
                  defaultValue={""}
                />
              </div>
              <div className='col-span-2' >
                <label
                  htmlFor="main_image"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product image
                </label>
                <input
                  type="file"
                  name="main_image"
                  id="main_image"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type main_image"

                />
              </div>

            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 bg-blue-600 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
            >
              Add product
            </button>
          </form>
        </div>
      </section>







    </div>
  )
}
