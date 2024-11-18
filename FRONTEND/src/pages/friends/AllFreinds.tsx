import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar'
import Friend from '../../Components/freindsComponents/Friend'
import { userService } from '../../Api/User.service';
import { User } from '../../Types/User';
import SuggestionFreinds from '../../Components/freindsComponents/SuggestionFreinds';


export default function AllFreinds() {
    const onLineUser = JSON.parse(localStorage.getItem('user') || '{}');
    const [friendsData, setFriendsData] = useState<User[]>([]);
    const [usersData, setUsersData] = useState<User[]>([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState<User[]>([]);
    const [search, setSearch] = useState('');
    // =======================freinds============================
    useEffect(() => {
        const fetchFriendData = async () => {

            try {
                const friendData = await userService.getUserFriends(onLineUser._id);

                setFriendsData(friendData);
            } catch (error) {
                console.error('Error fetching friend data:', error);
            }

        };

        fetchFriendData();
    }, [])

    // ============================users======================
    useEffect(() => {
        const fetchUserData = async () => {

            try {
                const allUsers = await userService.getAllUsers();

                setUsersData(allUsers);
            } catch (error) {
                console.error('Error fetching friend data:', error);
            }

        };

        fetchUserData();
    }, [])

    // ==============================filter users (friend/normal users)====================
    useEffect(() => {

        const data = usersData.filter((user) => {
            if (friendsData.some((friend) => friend._id === user._id)) {
                return false;
            }
            if (user._id === onLineUser._id) {
                return false;
            }

            return true;
        });
        console.log(data);

        setFilteredSuggestions(data)
    }, [usersData, friendsData])

    // ====================  search  ====================
    const searchFriends = friendsData.filter((friend) =>
        `${friend.firstName} ${friend.lastName}`.toLowerCase().includes(search.toLowerCase())
    );

    const searchUserSuggestions = filteredSuggestions.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <div className='bg-[#2C2F33] flex '>

            <Sidebar />
            <div className='felx-1 justify-center '>

                <div className=' my-5  bg-white w-[92vw] min-h-[95vh]  rounded-[30px]'>
                    <div className='w-full flex justify-around items-center h-20 '>

                        <p className='text-3xl font-medium text-black'>All <span className='text-gray-800'>Freinds</span></p>
                        <div className='flex items-center rounded-3xl px-5 border border-gray-600 '>
                            <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" className='w-96 h-11 outline-none pl-4 ' placeholder='Search...' />
                            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 512 512"><path fill="#1e3050" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                        </div>

                    </div>

                    <div className='w-[100%] min-h-[50vh] grid grid-cols-3'>
                        {searchFriends.map((friend) => (
                            <Friend key={friend._id} friend={friend} />
                        ))}
                    </div>
                    <div className='w-full flex justify-between items-center mb-4  h-10'>
                        <span className='font-base pl-6 text-gray-500'>Suggestion friends</span>
                        <div className='w-[88%] h-1  border-b-2'>

                        </div>
                    </div>
                    <div className='w-[100%] min-h-[50vh] grid grid-cols-3'>
                        {searchUserSuggestions.map((user) => (
                            <SuggestionFreinds key={user._id} user={user} />
                        ))}

                    </div>
                </div>


            </div>
        </div>
    )
}
