import React, { useState } from 'react'
import PopUpGroups from './PopUpGroups'
import { User } from '../../Types/User';
import defaultProfilePicture from '../../profileicon.jpg'

interface FriendProps {
    friend: User;
    
  }
export default function Friend({ friend }: FriendProps) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [userId , setUserId] = useState<string | number>('')

    const handleOpenPopup = (id: string | number) => {
        setUserId(id)
        setIsPopupOpen( !isPopupOpen );
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };
    return (

        <div className="ml-9 mb-6 w-96 h-48 bg-white shadow-lg rounded-lg  overflow-hidden">

            <div className="bg-purple-500 h-24 flex items-center justify-start relative">
                <div className="w-20 h-20 bg-white rounded-full overflow-hidden absolute bottom-[-30px]">
                    <img
                        src={friend.profilePicture || defaultProfilePicture}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className='flex justify-around items-center'>

                <div className="pt-10 pb-4 px-4 ">
                    <h2 className="text-lg font-semibold text-gray-800">{friend.firstName} {friend.lastName}</h2>
                    <p className="text-sm text-gray-500">{friend.username}</p>
                </div>
                <div className=" flex px-4 py-2  ">
                    <button onClick={()=>handleOpenPopup(friend._id)} className="text-sm bg-green-600 hover:bg-green-700 text-white font-semibold border rounded-md py-1 px-2 mr-2">Invit <span className='font-bold'>+</span></button>
                    <button className=" flex items-center cursor-default text-sm bg-gray-400  text-white font-semibold border rounded-md py-1 px-2"> <span className='pr-3'>Friend</span>  <svg xmlns="http://www.w3.org/2000/svg" height="14" width="12.25" viewBox="0 0 448 512"><path fill="#ffffff" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></button>

                </div>
            </div>

            <PopUpGroups
                onOpen={isPopupOpen}
                onClose={handleClosePopup}
                userId={userId}
            />




        </div>

    )
}
