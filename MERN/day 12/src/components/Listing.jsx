import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { context } from '../Maincontext'



export default function Listing() {
  const [products, setProducts] = useState([])
  const [categorie, setCategorie] = useState([])
  const [loading, setLoading] = useState(true);
  const [ProductName, setProductName] = useState("")
  const { categorie_slug } = useParams();
  let limit = 10;
  const [totalpages, settotalPages] = useState(0)
  const [currentPage, setcurrentPage] = useState(0)
  const [SearchParams, setSearchParams] = useSearchParams(0)
  const { addToCart } = useContext(context)


  useEffect(
    () => {
      const query = new URLSearchParams()
      query.append('skip', currentPage)
      query.append('limit', limit)
      setSearchParams(query)

      axios.get(`https://dummyjson.com/products?skip=${limit * currentPage}&limit=${limit}`)
        .then(
          (succes) => {
            //resolve
            setProducts(succes.data.products)
          }
        )
        .catch(
          (err) => {
            console.log(err)
            //rejection
          }
        ).finally(
          () => {
            setLoading(true)
          }
        )

    }
    ,
    [currentPage]
  )

  const pagination = [];
  for (let i = 0; i < totalpages; i++) {
    pagination.push(<li onClick={() => {
      setcurrentPage(i)
    }} className="flex cursor-pointer items-center justify-center px-3 h-8 m text-gray-500 bg-white border  border-gray-300  hover:bg-gray-100 hover:text-gray-700">
      {i + 1}
    </li>)
  }



  const getcategories = () => {
    axios.get("https://dummyjson.com/products/categories")
      .then(
        (sucess) => {
          setCategorie(sucess.data)
        }
      )
      .catch(
        (err) => {
          console.log(err)
        }
      )
  }

  useEffect(
    () => {
      axios.get('https://dummyjson.com/product')
        .then(
          (succes) => {
            //resolve
            setProducts(succes.data.products)


          }
        )
        .catch(
          (err) => {
            console.log(err)
            //rejection

          }
        ).finally(
          () => {
            setLoading(true)
          }
        )
      getcategories()
    },
    []
  )

  useEffect(
    () => {
      axios.get(`https://dummyjson.com/products/search?q=${ProductName}`)
        .then(
          (succes) => {
            //resolve
            setProducts(succes.data.products)


          }
        )
        .catch(
          (err) => {
            console.log(err)
            //rejection

          }
        ).finally(
          () => {
            setLoading(true)
          }
        )
    }
    ,
    [ProductName]
  )

  useEffect(
    () => {
      if (categorie_slug == null) {
        setLoading(false)
        axios.get('https://dummyjson.com/product')
          .then(
            (succes) => {
              //resolve
              setProducts(succes.data.products)
              settotalPages(Math.ceil(succes.data.total / limit))
            }
          )
          .catch(
            (err) => {
              console.log(err)
              //rejection

            }
          ).finally(
            () => {
              setLoading(true)
            }
          )



      } else {
        axios.get(`https://dummyjson.com/products/category/${categorie_slug}`)
          .then(
            (succes) => {
              console.log(succes)
              //resolve
              setProducts(succes.data.products)
              settotalPages(Math.ceil(succes.data.total / limit))

            }
          )
          .catch(
            (err) => {
              console.log(err)
              //rejection
            }
          )
      }
    }
    ,
    [categorie_slug]
  )


  return (
    <div className="bg-white max-w-[1200px] mx-auto grid grid-cols-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">categories</h2>
        <ul className='mt-2'>
          <Link to="/">
            <li className={`shadow-xl cursor-pointer my-4 px-2 
                      ${categorie_slug == null ? 'text-purple-400' : ''}
                      `}>All</li>
          </Link>
          {
            categorie.map(
              (data, index) => {
                return (
                  <Link to={`/${data.slug}`}>
                    <li className={`shadow-xl cursor-pointer my-4 px-2 
                      ${categorie_slug == data.slug ? 'text-purple-400' : ''}
                      `}>{data.name}</li>
                  </Link>
                )
              }
            )
          }
        </ul>
      </div>
      <div className="mx-auto col-span-3  px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
        <ul className='flex'>
          {
            pagination
          }
        </ul>
        <input
          disabled={categorie_slug == null ? false : true}
          onChange={(e) => {
            setProductName(e.target.value)
          }}
          value={ProductName}
          type="search" id="first_name" class="bg-gray-50 border my-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " required />

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {
            loading == false ?
              [1, 2, 3, 4].map(
                (d) => {
                  return (
                    <div className="min-w-[200px] mx-auto p-4 border border-gray-200 rounded-lg shadow-lg">
                      {/* Image skeleton */}
                      <div className="animate-pulse">
                        <div className="bg-gray-300 h-48 w-full rounded-md" />
                      </div>
                      {/* Title skeleton */}
                      <div className="mt-4 animate-pulse">
                        <div className="bg-gray-300 h-6 w-3/4 rounded-md" />
                      </div>
                      {/* Price skeleton */}
                      <div className="mt-2 animate-pulse">
                        <div className="bg-gray-300 h-4 w-1/2 rounded-md" />
                      </div>
                      {/* Rating skeleton */}

                    </div>
                  )
                }
              )
              :
              products.map(
                (data, index) => {
                  return (
                    <>
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
                        <button onClick={() => addToCart(data.id)} type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Add to cart</button>
                      </div>
                     
                    </>

                  )
                }
              )

          }


        </div>
      </div>
    </div>
  )
}
