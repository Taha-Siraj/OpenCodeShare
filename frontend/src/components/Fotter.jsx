import React from 'react';
import { Link } from 'react-router-dom';

const Fotter = () => {
    return (
        <>
            <div className='bg-black py-10 h-[200px] font-poppins text-white  px-10  m-2 rounded-md'>
                <div className='flex items-center justify-between w-full'>
                    <div className='flex items-start gap-2 flex-col justify-center'>
                        <img src='vite.svg' alt="" />
                        <p className='text-center text-gray-300 font-poppins'>Fast, secure, and simple file sharing for everyone.</p>
                    </div>
                    <div className='flex items-center gap-x-4 text-gray-300 text-sm'>
                        <Link to='privacy-policy' className='hover:text-white transition-all duration-300 hover:scale-105'>Privacy Policy</Link>
                        <Link to='terms-of-service' className='hover:text-white transition-all duration-300 hover:scale-105'>Terms of Service</Link>
                        <Link to='contact' className='hover:text-white transition-all duration-300 hover:scale-105'>Contact</Link>
                    </div>

                </div>

                <div className='relative'>
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='absolute right-10 text-white text-2xl cursor-pointer hover:text-gray-300 transition-all duration-300 hover:scale-105 bg-gray-800 rounded-full p-2 text-black flex items-center justify-center w-10 h-10  hover:bg-gray-700 hover:text-white '>↑</button>
                </div>
            </div>

        </>
    )
}

export default Fotter