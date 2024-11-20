import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../Context'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import ProductBox from '../../Components/website/ProductBox'


export default function Store() {
  const { fetchCategory, category, fetchColor, color, product, fetchProduct } = useContext(MainContext)
  const [limit, setLimit] = useState(0)
  const [product_color, setProductColor] = useState(null)
  const [searchParams, SetSearchParams] = useSearchParams()
  const { category_slug } = useParams()


  useEffect(
    () => {
      fetchCategory()
      fetchColor()
      if (searchParams.get("limit")) {
        setLimit(searchParams.get("limit"))
      }

      if (searchParams.get("product_color")) {
        setLimit(searchParams.get("product_color"))
      }
    },
    []
  )

  useEffect(
    () => {
      const query = {}
      query["limit"] = limit
      if (product_color != null) {
        query["product_color"] = product_color

      }
      fetchProduct(null, limit, category_slug, product_color)
      SetSearchParams(query)
    },
    [limit, category_slug, product_color]
  )
  return (
    <div className='max-w-[1200px] grid gap-2 grid-cols-5 mx-auto py-4'>
      <div>
        <div className='w-full px-4 bg-[#F6F7F8] py-2'>
          <div className='text-[18px] font-bold'>
            ACCESORIES
          </div>
          <ul>
            <li className='font-[600] cursor-pointer relative text-[#262626] my-2'>
              <Link to={`/store`}> All</Link>

            </li>
            {
              category.map((cat, i) => {
                return (
                  <li key={cat._id} className='font-[600] cursor-pointer relative text-[#262626] my-2'>
                    <Link to={`/store/${cat.slug}`}>  {cat.name}</Link>
                    <span className=' absolute right-0'>({cat.productCount})</span>
                  </li>
                )
              })
            }

          </ul>
        </div>

        <div className='w-full mt-10 px-4 bg-[#F6F7F8] py-2'>
          <div className='text-[18px] font-bold'>
            Colors
          </div>
          <ul className='flex gap-10 my-2 flex-wrap'>
            {
              color.map((col, i) => {
                return (
                  <li onClick={() => setProductColor(col._id)} style={{ background: col.colorCode }} key={col._id} className='font-[600] relative w-[20px] rounded-full  h-[20px] text-[#262626] my-2'>
                  </li>
                )
              })
            }

          </ul>
        </div>

      </div>
      <div className=' col-span-4 px-4'>
        <div className='w-full bg-gray-400 p-3'>
          <select onChange={(e) => setLimit(e.target.value)} className=' bg-transparent border-2  border-[white]' name="" id="">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="30">All</option>
          </select>

        </div>
        <div className='grid grid-cols-4 my-10 gap-2'>
          {
            product.map((prod, index) => {
              return (
                <ProductBox key={prod._id} {...prod} />
              )
            })
          }

        </div>
      </div>
    </div>
  )
}
