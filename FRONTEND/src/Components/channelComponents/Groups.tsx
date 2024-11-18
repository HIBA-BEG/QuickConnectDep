import React from 'react'
import logo from '../../logo.svg'
interface props {
  name : string;
}
export default function Groups ({name}: props) {
  
  return (
    <div className='ml-3 mt-4 flex items-center w-[300px] h-13 gap-2  '>

      <div className='w-12 h-12  '>
        <img src={logo} className='rounded-md' alt="" />

      </div>
      <div className='w-60 h-10 text-gray-800 '>
        <p className='text-xl font-medium' >{name}</p>
      </div>

    </div>
  )
}
