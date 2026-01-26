import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/navbar'
import Home from '@/pages/Home'
import Fotter from '@/components/Fotter'
import Howitswork from '@/pages/Howitswork'
const CustomRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/how-it-works" element={<Howitswork />} />
            </Routes>
            <Fotter />
        </>
    )
}

export default CustomRoutes