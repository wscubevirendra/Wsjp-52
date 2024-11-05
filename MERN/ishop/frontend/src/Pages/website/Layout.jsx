import React from 'react'
import Header from '../../Components/website/Header'
import Footer from '../../Components/website/Footer'
import { Outlet } from 'react-router-dom'

export default function
    () {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />

        </>
    )
}
