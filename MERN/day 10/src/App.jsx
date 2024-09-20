import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Layout from './pages/Layout'
import Login from './pages/Login'


export default function App() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />
          },
          {
            path: "/about",
            element: <About />
          },
          {
            path: "/Gallery",
            element: <Gallery />
          }
        ]
      }
      , 
      {
        path: '/login',
        element: <Login />
      }

    ]
  )
  return (

    <RouterProvider router={router} />
  )
}
