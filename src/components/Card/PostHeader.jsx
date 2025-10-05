import React from 'react'
import defaultImage from "../../assets/download (1).png";

export default function PostHeader({photo, name,data}) {
  return (
    <div className="flex items-center gap-3 w-full ">
      
              <img
              onError={(e) => { e.target.src = image }}

                className="rounded-full w-10 h-10 md:w-12 md:h-12 object-cover"
                src={photo}
                alt={name}
              />
              <div className="flex flex-col">
                <h3 className="text-sm md:text-md font-semibold">{name}</h3>
                <p className="text-xs md:text-sm text-gray-500">{data.split('.',1).join().replace('T',' ')}</p>
              </div>
            </div>
           
  )
}
