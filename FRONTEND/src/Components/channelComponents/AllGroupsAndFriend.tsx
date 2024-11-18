import React from 'react'
import logo from '../../profileicon.jpg'

export default function AllGroupsAndFriend() {
    return (
        <div className='ml-3 mt-3 flex w-[270px] h-13 gap-2  border-b-2 border-gray-600 '>

            <div className='w-12 h-12  '>
                <img src={logo} className='rounded-md' alt="" />

            </div>
            <div className='w-60 h-10 text-gray-800 '>
                <b >Elgrande TOTO</b>
                <p>Lorem, ipsum dolor.</p>
            </div>

        </div>
    )
}
