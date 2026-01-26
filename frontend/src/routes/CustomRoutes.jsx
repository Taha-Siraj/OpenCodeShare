import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/navbar'
import Home from '@/pages/Home'
const CustomRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    )
}

export default CustomRoutes