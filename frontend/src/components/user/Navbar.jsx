import React from 'react'


export default function Navbar() {
  return (
    <div className="bg-secondary">
        <div className=" text-white max-w-screen-x1 mx-auto p-2  ">
          <div className="flex justify-between items-center">
          <img src="./logo-color.png" alt="" className='h-10 ' />
           <ul>
            <li>log in</li>
           </ul>

          </div>
           
        </div>
    </div>
  )
}
