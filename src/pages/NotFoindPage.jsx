import React from "react";
import { Link } from "react-router-dom";
import notFoundImg from "../assets/undraw_page-not-found_6wni.svg";


export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  px-6">
       
      <img
        src={notFoundImg}
        alt="404 Not Found"
        className="w-full max-w-md mb-8"
      />

      
      <h1 className="text-4xl font-bold text-[#0f172a] mb-4">Oops! Page Not Found</h1>
      <p className="text-gray-600 text-center max-w-md mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>


    <Link
  to="/"
  className="px-6 py-3 bg-gradient-to-r from-pink-600 to-sky-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
>
  Back to Home
</Link>

    </div>
  );
}
