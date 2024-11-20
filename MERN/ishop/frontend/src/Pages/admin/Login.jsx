import React, { useContext, useState } from "react";
import axios from 'axios'
import { MainContext } from "../../Context";
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { login } from "../../redux/reducers/Adminslice";


const Login = () => {
  const { notify, API_BASE_URL } = useContext(MainContext)
  const navigation = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    }
    e.preventDefault();
    axios.post(API_BASE_URL + "/admin/login", data).then(
      (responce) => {
        console.log(responce)
        notify(responce.data.msg, responce.data.status)
        if (responce.data.status == 1) {
          navigation("/admin")
          dispatch(login({
            data: responce.data.admin,
            token:responce.data.token
          }))
        }
      }
    ).catch(
      (error) => {

      }
    )

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
