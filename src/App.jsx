
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import Feedpages from './pages/Feedpages'
import PostDetailsPages from './pages/PostDetailsPages'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFoindPage from './pages/NotFoindPage'
import ProtectedRoute from './layouts/ProtectedRoute'
import AuthProtedRoute from './layouts/AuthProtedRoute'
import AddPosts from './pages/AddPosts'


const router=createBrowserRouter(
  [
    {path:'' , element:<MainLayout/> , children:[
      {index:true , element:
      <ProtectedRoute>
        <Feedpages/>
        </ProtectedRoute>},
      {path:'profile' , element:
      <ProtectedRoute>
        
        </ProtectedRoute>},
        
      {path:'addpost' , element:
      <ProtectedRoute>
        <AddPosts/>
        </ProtectedRoute>},
      {path:'postdetails/:id' , element:
        <ProtectedRoute>
          <PostDetailsPages/>
        </ProtectedRoute>
      },
      {path:'*' , element:<NotFoindPage/>},
    ]},
    {path:'' , element:<AuthLayout/> ,
      children:[

        {path:'login',element:
          <AuthProtedRoute>
            <Login/>
          </AuthProtedRoute>
        },
        {path:'register',element:
        
        <AuthProtedRoute>

          <Register/>
        </AuthProtedRoute>
        },
      ]
    }
  ]
)

export default function App() {
  return (
   
   <>
   <RouterProvider router={router}>
    
   </RouterProvider>
   </>
  )
}
