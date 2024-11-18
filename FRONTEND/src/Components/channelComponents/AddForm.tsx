import React, { useContext, useState } from 'react'
import { addChannel } from '../../Api/channelAPI/addChannelApi';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { log } from 'console';
import { ChannelContext } from '../../Contexts/ChannelContext';
interface User {
    _id: string;
}
export default function AddForm() {
    const channelContext = useContext(ChannelContext);
    const handleAddChannel = channelContext?.addChannel;

    const userString = localStorage.getItem('user');
    let user: User;
    if (userString) {
        user = JSON.parse(userString);
    }

    type ChannelType = "Private" | "Public" | "Conversation";
    const [data, setData] = useState({
        name: '',
        expirationTime: '',
        type: "Public" as ChannelType,
        description: '',
        bannedWords: [] as string[],
        moderator: ''
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: name === "bannedWords" ? value.split(",").map((word) => word.trim()) : value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const submitData = {
            ...data,
            moderator: user._id,

        };

        const addData = await addChannel(submitData);
        if (handleAddChannel) {
            handleAddChannel(addData)
            toast.success('Channel added successfully!', { position: 'bottom-right' });
        }

    };

    return (
        <div className='w-[95%] h-[95%] my-2 mx-3 flex flex-col gap-8   rounded-md '>

            <div className='flex justify-around items-center  w-full h-10 pt-3'>


                <div>
                    <p className='text-3xl font-medium'>Add New Group</p>
                </div>

            </div>

            <div className="p-8 w-[90%] mx-auto bg-gray-50">
                <form onSubmit={handleSubmit} >

                    <div className="mb-6">
                        <label className="block text-black font-semibold mb-2">Name</label>
                        <input onChange={handleInputChange} name='name' type='text' className="bg-indigo-100 text-gray-800 p-3 rounded-md h-10 w-[100%]" />
                    </div>

                    <div className="mb-6">
                        <label className="block text-black font-semibold mb-2">Expiration Time</label>
                        <input min={new Date().toISOString().slice(0, 16)} onChange={handleInputChange} name='expirationTime' type='datetime-local' placeholder='24 Nov 2024' className="bg-indigo-100 text-gray-800 p-3 rounded-md h-10 w-[100%]" />

                    </div>

                    <div className="mb-6">
                        <label className="block text-black font-semibold mb-2">Type</label>

                        <select onChange={handleInputChange} name='type' className="bg-indigo-100 text-gray-800 p-3 rounded-md h-11 w-[100%]">

                            <option value="Private">private</option>
                            <option value="Public">public</option>
                            <option value="Conversation">Conversation</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-black font-semibold mb-2">Description</label>
                        <textarea onChange={handleInputChange} name='description' className="bg-indigo-100 text-gray-700 p-3 rounded-md max-h-44 w-[100%]">

                        </textarea>
                    </div>

                    <div className="mb-6">
                        <div className='flex '>

                        <label className="block text-black font-semibold mb-2">Banne World</label> 
                        <p className='text-sm pl-2 font-light text-gray-500'>(world1 <b className='text-black'>,</b> world2)</p>
                        </div>
                        <textarea onChange={handleInputChange} name='bannedWords' className="bg-indigo-100 text-gray-700 p-3 rounded-md max-h-44 w-[100%]">

                        </textarea>
                    </div>
                    <div className='w-full flex justify-end'>
                        <button type='submit' className='w-28 h-10 bg-green-600 rounded-md text-white font-medium'>
                            Submit
                        </button>
                    </div>



                </form>
            </div>

            <ToastContainer />
        </div >
    )
}
