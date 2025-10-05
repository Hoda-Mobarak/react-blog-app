import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function AuthLayout() {
  return (

   
    <>
    
     <Navbar/>
    <div className="min-h-screen flex justify-center items-center bg-pink-200 px-4">
      <Outlet />
    </div>
    
    </>
  );
}
