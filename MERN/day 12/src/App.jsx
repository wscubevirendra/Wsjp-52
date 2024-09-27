import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Listing from './components/Listing'
import Details from './components/Details'
import Layout from './components/Layout'
import Cart from './components/Cart'

export default function App() {
  const routers = createBrowserRouter(
    [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '/:categorie_slug?',
            element: <Listing />
          },
          {
            path: "details/:id",
            element: <Details />
          }
          ,
          {
            path: "cart",
            element: <Cart />
          }
        ]

      }
    ]
  )
  return (
    <RouterProvider router={routers} />
  )
}
