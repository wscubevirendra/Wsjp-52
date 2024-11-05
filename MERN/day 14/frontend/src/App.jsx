import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [users, setusers] = useState([]);
  const [userDetail, setuserDetail] = useState(null);


  const toastMsg = (msg, flag) => {
    console.log(msg, flag)
    toast(msg, { type: flag ? "success" : "error" })
  }

  const fetchUser = () => {
    axios.get("http://localhost:5000/user").
      then(
        (succes) => {
          setusers(succes.data.users)
        }
      ).catch(
        (error) => {
          console.log(error)

        }
      )
  }

  useEffect(
    () => {
      fetchUser()
    },
    []
  )

  const submitHandler = (e) => {
    e.preventDefault()
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      contact: e.target.contact.value,
    }
    let responce;
    if (userDetail == null) {
      responce = axios.post("http://localhost:5000/user/register", data)
    } else {
      responce = axios.put(`http://localhost:5000/user/update/${userDetail._id}`, data)
    }


    responce.then(
      (succes) => {
        if (succes.data.status == 1) {
          console.log(succes)
          e.target.reset()
          fetchUser()
          setuserDetail(null)

        }
        toastMsg(succes.data.msg, succes.data.status)

      }

    ).catch(
      (error) => {
        console.log(error)

        toastMsg("Internal Server Error", 0)

      }
    )

  }

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:5000/user/delete/${id}`).then(
      (succes) => {
        if (succes.data.status == 1) {
          fetchUser()
        }
        toastMsg(succes.data.msg, succes.data.status)

      }

    ).catch(
      (error) => {
        toastMsg("Internal Server Error", 0)

      }
    )
  }

  const statusChange = (id) => {
    axios.patch(`http://localhost:5000/user/status-change/${id}`).then(
      (succes) => {
        if (succes.data.status == 1) {
          fetchUser()
        }
        toastMsg(succes.data.msg, succes.data.status)
      }

    ).catch(
      (error) => {
        toastMsg("Internal Server Error", 0)

      }
    )
  }

  return (
    <>
      <h1 className='w-full py-2 text-[red] bg-black mx-auto text-center '>User DashBoard</h1>
      <div className='max-w-[1200px] mx-auto grid grid-cols-8'>
        <div className="relative col-span-6">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Contact
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
                users.map(
                  (data, index) => {
                    return (
                      <tr className="bg-white border-b">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {data.name}
                        </th>
                        <td className="px-6 py-4">{data.email}</td>
                        <td className="px-6 py-4">{data.contact}</td>
                        <td className="px-6 py-4">
                          {
                            data.status ?
                              <button onClick={() => statusChange(data._id)} type="button" class="focus:outline-none text-white bg-green-700  focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Active</button>
                              :
                              <button onClick={() => statusChange(data._id)} type="button" class="focus:outline-none text-white bg-orange-900  focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Inactive</button>

                          }
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => deleteHandler(data._id)} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Delete</button>
                          <button onClick={() => setuserDetail(data)} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
                        </td>
                      </tr>
                    )
                  }
                )
              }

            </tbody>
          </table>
        </div>
        <RegisterUser userDetail={userDetail} submitHandler={submitHandler} />
      </div>

    </>
  )
}




function RegisterUser({ submitHandler, userDetail }) {
  return (
    <div className="col-span-2 w-full mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl text-center font-bold mb-6">Register</h2>
      <ToastContainer />
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={userDetail?.name}

            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={userDetail?.email}

            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Contact
          </label>
          <input
            type="tel"
            id="contact"
            name="contact"
            defaultValue={userDetail?.contact}


            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your contact"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            defaultValue={userDetail?.password}


            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
