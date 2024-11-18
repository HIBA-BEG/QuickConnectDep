import React from 'react'
import logo from '../../profileicon.jpg'

interface props {
    firstName: string;
    lastName: string;
}

export default function Members({ firstName, lastName }: props) {
    
    return (
        <div className='ml-3 mt-4 flex items-center w-[300px] h-13 gap-2  '>

            <div className='w-12 h-12'>
               
                <img src={logo} className='rounded-md' alt="" />
            </div>
            <div className='w-60 h-10 text-gray-800 '>
                <p className='text-xl font-medium' >{firstName}  {lastName}</p>
            </div>
            <div className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="25" viewBox="0 0 640 512"><path fill="#FFA629" d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L353.3 251.6C407.9 237 448 187.2 448 128C448 57.3 390.7 0 320 0C250.2 0 193.5 55.8 192 125.2L38.8 5.1zM264.3 304.3C170.5 309.4 96 387.2 96 482.3c0 16.4 13.3 29.7 29.7 29.7l388.6 0c3.9 0 7.6-.7 11-2.1l-261-205.6z" /></svg>
            </div>

        </div>
    )
}
