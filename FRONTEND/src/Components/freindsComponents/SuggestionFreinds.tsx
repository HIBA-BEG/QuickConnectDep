import React, { useEffect, useState } from 'react'
import PopUpGroups from './PopUpGroups'
import { User } from '../../Types/User';
import { userService } from '../../Api/User.service';
import Swal from 'sweetalert2';
import { io, Socket } from 'socket.io-client';
import defaultProfilePicture from '../../profileicon.jpg'

interface UserProps {
    user: User;
}
export default function SuggestionFreinds({ user }: UserProps) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [userId, setUserId] = useState<string | number>('')
    const [pendingRequests, setPendingRequests] = useState<Set<string>>(new Set());
    const [socket, setSocket] = useState<Socket | null>(null);


    const handleOpenPopup = (id: string | number) => {
        setUserId(id)
        setIsPopupOpen(!isPopupOpen);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    useEffect(() => {
        const newSocket = io('http://localhost:3001');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleAddFriend = async (userId: string | number) => {
        try {

            if (pendingRequests.has(userId as string)) {
                Swal.fire({
                    icon: 'info',
                    title: 'Already Sent',
                    text: 'Friend request already sent.',
                    confirmButtonColor: '#7577ED',
                });
                return;
            }


            await userService.sendFriendRequest(userId as string);


            setPendingRequests((prev) => new Set(prev).add(userId as string));


            socket?.emit('friendRequest', {
                to: userId,
                from: user._id,
            });

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Friend request sent successfully!',
                confirmButtonColor: '#7577ED',
            });
        } catch (error) {
            console.error('Error sending friend request:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to send friend request. Please try again.',
                confirmButtonColor: '#7577ED',
            });
        }
    };
    return (

        <div className="ml-9 mb-6 w-96 h-48 bg-white shadow-lg rounded-lg  overflow-hidden">

            <div className="bg-purple-500 h-24 flex items-center justify-start relative">
                <div className="w-20 h-20 bg-white rounded-full overflow-hidden absolute bottom-[-30px]">
                    <img
                        src={user.profilePicture || defaultProfilePicture}

                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className='flex justify-around items-center'>

                <div className="pt-10 pb-4 px-4 ">
                    <h2 className="text-sm font-semibold text-gray-800">{user.firstName} {user.lastName}</h2>
                    <p className="text-sm text-gray-500">{user.username}</p>
                </div>
                <div className="flex px-4 py-2 ">
                    <button onClick={() => handleOpenPopup(user._id)} className="text-sm bg-green-600 hover:bg-green-700 text-white font-semibold border rounded-md py-1 px-2 mr-2">Invit <span className='font-bold'>+</span></button>
                    <button onClick={() => handleAddFriend(user._id)} disabled={pendingRequests.has(user._id)} className="flex items-center text-sm bg-gray-400 hover:bg-gray-500 text-white font-semibold border rounded-md py-1 px-2">

                        {pendingRequests.has(user._id) ?
                            <span className='pr-3'>
                                Request Sent
                            </span>

                            : (
                                <>
                                    <span className='pr-3'>
                                        Add Friend
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 640 512"><path fill="#ffffff" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></svg>

                                </>
                            )
                        }

                    </button>

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
