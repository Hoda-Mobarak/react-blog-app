import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'


export default function MainLayout() {
  return (
   <>
   
   <Navbar/>

   <div className='bg-pink-200 min-h-screen pt-4 backdrop-blur-md '>
     <Outlet/>
   </div>
   

   </>
  )
}










