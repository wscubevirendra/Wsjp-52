import React, { Children, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WebsiteLayout from './Pages/website/Layout'
import Home from './Pages/website/Home'
import Store from './Pages/website/Store'
import Profile from './Pages/website/Profile'
import Deshboard from './Pages/admin/Deshboard'
import AdminLayout from './Pages/admin/Layout'
import CategoryAdd from './Pages/admin/category/Add'
import CategoryView from './Pages/admin/category/View'
import CategoryEdit from './Pages/admin/category/Edit'
import ColorAdd from './Pages/admin/color/Add'
import ColorView from './Pages/admin/color/View'
import ColorEdit from './Pages/admin/color/Edit'
import ProductAdd from './Pages/admin/product/Add'
import ProductView from './Pages/admin/product/View'
import Cart from './Pages/website/Cart'
import UserLogin from './Pages/website/Login'
import Register from './Pages/website/Register'
import MultipleImages from './Pages/admin/product/MultipleImages'
import Login from './Pages/admin/Login'
import { useDispatch } from 'react-redux'
import { lsCartUpdate } from './redux/reducers/Cartslice'
import { login } from './redux/reducers/Userslice'
import Checkout from './Pages/website/Checkout'
import ThankYou from './Pages/website/ThankYou'




export default function App() {
  const dispatched = useDispatch()

  useEffect(
    () => {
      const lsUser = localStorage.getItem("user")
      const lsUser_token = localStorage.getItem("user-token")
      if (lsUser) {
        dispatched(
          login(
            {
              data: JSON.parse(lsUser),
              token: lsUser_token
            }
          )
        )
      }

    }
    ,
    []
  )

  useEffect(
    () => {
      dispatched(lsCartUpdate())
    },
    []
  )

  const routers = createBrowserRouter(
    [
      {
        path: "/",
        element: <WebsiteLayout />,
        children: [
          {
            path: "/",
            element: <Home />
          },
          {
            path: "store/:category_slug?",
            element: <Store />
          }
          ,
          {
            path: "profile",
            element: <Profile />
          },
          {
            path: "cart",
            element: <Cart />
          }, {
            path: "checkout",
            element: <Checkout />
          }, {
            path: "thank-you/:order_id?",
            element: <ThankYou />
          }
        ]

      },
      {
        path: "/login",
        element: <UserLogin />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "/admin",
            element: <Deshboard />
          },
          {
            path: "category/add",
            element: <CategoryAdd />
          }, {
            path: "category",
            element: <CategoryView />
          },
          {
            path: "category/edit/:category_id",
            element: <CategoryEdit />
          },
          {
            path: "color/add",
            element: <ColorAdd />
          }, {
            path: "color",
            element: <ColorView />
          },
          {
            path: "color/edit/:color_id",
            element: <ColorEdit />
          }, {
            path: "product",
            element: <ProductView />
          }, {
            path: "product/add",
            element: <ProductAdd />
          }
          , {
            path: "product/multiple-image/:product_id",
            element: <MultipleImages />
          }
        ]



      },
      {
        path: "/admin/login",
        element: <Login />
      }


    ]
  )

  return (
    <RouterProvider router={routers} />
  )
}
