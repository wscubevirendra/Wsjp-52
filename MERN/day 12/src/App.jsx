import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Listing from './components/Listing'
import Details from './components/Details'

export default function App() {
  const routers = createBrowserRouter(
    [
      {
        path: '/',
        element: <Listing />
      },
      {
        path: "details/:id",
        element: <Details />
      }
    ]
  )
  return (
    <RouterProvider router={routers} />
  )
}
