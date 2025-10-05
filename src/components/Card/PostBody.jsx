import React from 'react'

export default function PostBody({body , image}) {
  return (
    <div className="my-4 ">

     {body &&  <p className='mb-6 my-6'>{body}</p>}
         {image && <img src={image} className='w-full max-h-[400px]  object-cover ' alt="Post" />}
      
    </div>
  )
}
