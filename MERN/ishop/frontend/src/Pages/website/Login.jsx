import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../../redux/reducers/Userslice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [searchParams, SetsearchParams] = useSearchParams()
  const navigate = useNavigate();
  const disptached = useDispatch();
  const cart = useSelector((state) => state.cart)

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    }


    axios.post("http://localhost:5000/user/login", data).then(
      (responce) => {
      
        if (responce.data.status == 1)
          
        disptached(login({
          data: responce.data.user,
          token: responce.data.token
        }))

        axios.post("http://localhost:5000/user/move-to-cart/" + responce.data.user._id,
          {
            cartData: JSON.stringify(cart.data)
          }
        ).then(
          (succes) => {
            console.log(succes)

          }
        ).catch(
          (error) => {
            console.log(error)
          }
        )




        if (searchParams.get("ref") === "checkout") {
          navigate("/checkout")
        } else {
          navigate("/")
        }
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome to <span className="text-blue-500">iShop.com</span>
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">
          Don't have an account?{" "}
          <Link to={`/register?${searchParams.toString()}`} className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div >
  );
};

export default Login;
