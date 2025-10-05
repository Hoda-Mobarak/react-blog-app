import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from "@heroui/react";
import './index.css'
import App from './App.jsx'
import AuthContextProvider, { AuthContext } from './Context/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <AuthContextProvider>
        <Toaster/>
        <App />
      </AuthContextProvider>



    </HeroUIProvider>


  </StrictMode>,
)
