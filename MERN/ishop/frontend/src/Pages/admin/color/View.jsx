import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { MainContext } from '../../../Context';
import axios from 'axios';
import Swal from 'sweetalert2';



export default function View() {
  const { fetchCategory, category, API_BASE_URL, CATEGORY_URL, notify, COLOR_URL, fetchColor,color } = useContext(MainContext)


  const colorStatusHandler = (id) => {
    axios.patch(API_BASE_URL + COLOR_URL + `/status-update/${id}`).then(
      (succss) => {
        notify(succss.data.msg, succss.data.status)
        if (succss.data.status == 1) {
          fetchColor()
        }

      }
    ).catch(
      (error) => {
        notify("Internal Server Error", 0)
      }
    )

  }

  const colordeleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure for Category delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });

        axios.delete(API_BASE_URL + COLOR_URL + `/delete/${id}`).then(
          (succss) => {
            notify(succss.data.msg, succss.data.status)
            if (succss.data.msg == 1) {
              fetchColor()
            }

          }
        ).catch(
          (error) => {
            notify("Internal Server Error", 0)
          }
        )



      }
    });




  }

  useEffect(
    () => {
      fetchColor()
    },
    []
  )




  return (
    <div className=' shadow bg-white p-4'>
      <div className='flex  justify-between '>
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
                  Color
                </a>
              </div>
            </li>

          </ol>
        </nav>
        <div>
          <Link to="/admin/color/add" className="px-6 my-6 py-2 text-md font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-purple-500 to-pink-500 md:w-auto">
            Add +
          </Link>
        </div>
      </div>

      <div className="relative mt-10 overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Color name
              </th>
              <th scope="col" className="px-6 py-3">
                Color Code
              </th>
            
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              Array.isArray(color)
              &&
              color.map(
                (cat, i) => {
                  return (
                    <tr key={i} className="bg-white border-b">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {cat.name}
                      </th>
                      <td className="px-6 py-4">{cat.colorCode}</td>
                     
                      <td className="px-6 py-4">
                        {
                          cat.status == true ?
                            <button onClick={() => colorStatusHandler(cat._id)} className='p-2 bg-green-500 rounded-md text-white'>Active</button>
                            :
                            <button onClick={() => colorStatusHandler(cat._id)} className='p-2  bg-blue-700 rounded-md text-white'>Inactive</button>
                        }
                      </td>
                      <td>
                        <button onClick={() => colordeleteHandler(cat._id)} className='p-2  bg-blue-700  rounded-md text-white'>Delete</button>
                        <Link to={`/admin/color/edit/${cat._id}`}>
                          <button className='p-2 ml-2  bg-blue-700 rounded-md text-white'>Edit</button>
                        </Link>

                      </td>
                    </tr>
                  )
                }
              )
            }

          </tbody>
        </table>
      </div>

    </div>
  )
}
