import React from 'react'
import Navbar from '../features/Shared/Components/Navbar'
import Footer from '../features/Shared/Components/Footer'
import SearchBar from '../features/Shared/Components/SearchBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const AppLayout = ({ children }) => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] min-h-screen bg-[#faf7f2]'>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        closeButton={true}
        toastStyle={{
          fontSize: '14px',
          letterSpacing: '0.5px',
          fontWeight: '500'
        }}
      />
      <Navbar />
      <SearchBar />
      {children}
      <Footer />
    </div>
  )
}
