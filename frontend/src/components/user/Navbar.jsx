import React from 'react'
import { GiFilmSpool } from "react-icons/gi";
import Container from '../Container';


export default function Navbar() {
  return (
    <div className="bg-secondary">
        <Container className=" text-white p-2  ">
          <div className="flex justify-between items-center">
            <img src="./logo-color.png" alt="" className='h-10 ' />
            <ul className='flex items-center space-x-4'>
              <li>
                <button className='bg-mzy-blue p-1 rounded' >
                <GiFilmSpool className='text-white ' size={24}/> 
              </button> 
              </li>
              <li>
                <input type="text" className='border-2 border-dark-subtle p-1 bg-transparent text-xl outline-none focus:border-white transition text-white' placeholder='search...' />
              </li>
              <li className='text-white font-semibold text-lg'>Login</li>
           </ul>
          </div>
        </Container>
    </div>
  )
}
