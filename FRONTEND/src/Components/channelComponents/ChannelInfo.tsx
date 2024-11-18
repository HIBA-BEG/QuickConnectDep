import React, { useContext, useEffect, useState } from 'react'
import logo from '../../profileicon.jpg'
import { Channel } from '../../Types/Channel';
import { editeChannel } from '../../Api/channelAPI/editeChannelApi';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import PopUp from '../PopUp';
import { deleteChannel } from '../../Api/channelAPI/deleteChannelApi';
import { ChannelContext } from '../../Contexts/ChannelContext';
interface props {
    channelInfo: Channel[];
}
export default function ChannelInfo({ channelInfo }: props) {

    const channelContext = useContext(ChannelContext);
    const updateChannel = channelContext?.updateChannel;
    const removeChannel = channelContext?.removeChannel;



    const [options, setOptions] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [editeButton, setEditeButton] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [toDelete, setToDelete] = useState<string | number>('');

    // =============================data update =========================


    type ChannelType = "Private" | "Public" | "Conversation";
    const [data, setData] = useState({
        name: '',
        expirationTime: '',
        type: "Public" as ChannelType,
        description: '',
        bannedWords: [] as string[],
    });

    useEffect(() => {
        if (channelInfo[0]) {
            setData({
                name: channelInfo[0].name || '',
                expirationTime: channelInfo[0].expirationTime
                    ? channelInfo[0].expirationTime
                    : '',
                type: channelInfo[0].type || 'public',
                description: channelInfo[0].description || '',
                bannedWords: channelInfo[0].bannedWords || '',
            });
        }
    }, [channelInfo]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };
    // ==================================================================
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const updatedChannel = await editeChannel(data, channelInfo[0]?._id);
            if (updateChannel) {
                updateChannel(updatedChannel);
                toast.success('Channel updated successfully!', { position: 'bottom-right' });
            }
        } catch (error) {
            console.error("Error updating channel:", error);
            toast.error("Failed to update the channel.", { position: 'bottom-right' });
        }
    };
    // ============================ handle group to delete ===========================

    const handleOpenPopup = (id: string | number) => {
        setToDelete(id)
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleSubmit = async () => {

        try {
            await deleteChannel(toDelete);
            if (removeChannel) {
                removeChannel(toDelete);
                toast.success('Channel deleted successfully!', { position: 'bottom-right' });
            }
            setIsPopupOpen(false);
        } catch (error) {
            console.error("Error deleting channel:", error);
            toast.error("Failed to delete the channel.", { position: 'bottom-right' });
        }
    };

    //   ====================================

    const toggleOptions = () => {
        setOptions(!options);
        setEditeButton(false);
        setIsEditable(false);

    }
    const toggleEdite = () => {
        setIsEditable(!isEditable);
        setEditeButton(!editeButton);
    };
    return (
        <div className='w-[95%] h-[95%] my-4 mx-3 flex flex-col gap-8   rounded-md '>

            <div className='flex justify-around items-center  w-full h-10 pt-3'>

                <div className='w-14 h-14 rounded-md'>
                    <img src={logo} className='rounded-md' alt="" />
                </div>
                <div>
                    <p className='text-3xl font-medium'>{channelInfo[0]?.name}</p>
                </div>
                <div onClick={toggleOptions} className='  flex justify-center items-center cursor-pointer transition-all ease-out'>
                    {options ?
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 384 512"><path fill="#B3B3B3" d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" /></svg>
                        :
                        <svg className="w-8 h-8 text-[#B3B3B3]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M10.83 5a3.001 3.001 0 0 0-5.66 0H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17ZM4 11h9.17a3.001 3.001 0 0 1 5.66 0H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2Zm1.17 6H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17a3.001 3.001 0 0 0-5.66 0Z" />
                        </svg>
                    }

                </div>
                {options &&
                    <div className='flex justify-around items-center absolute w-20 h-8 rounded-md bg-[#efefef] top-20 left-[61.5%]'>
                        <div onClick={toggleEdite} className='cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path fill="#00ff04" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" /></svg>

                        </div>
                        <div onClick={() => handleOpenPopup(channelInfo[0]?._id)} className='cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><path fill="#ff0000" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>

                        </div>
                    </div>

                }


            </div>

            <div className="p-8 w-[90%] mx-auto bg-gray-50">
                <form onSubmit={handleUpdate} >

                    <div className="mb-6">
                        <label className="block text-black font-semibold mb-2">Name</label>
                        <input type='text' name="name" value={data.name} onChange={handleInputChange} disabled={!isEditable} className="bg-indigo-100 text-gray-800 p-3 rounded-md h-10 w-[100%]" />
                    </div>

                    <div className="mb-6">
                        <label className="block text-black font-semibold mb-2">Expiration Time</label>
                        <input type='datetime-local' name="expirationTime" value={data.expirationTime} disabled={!isEditable} onChange={handleInputChange} className="bg-indigo-100 text-gray-800 p-3 rounded-md h-10 w-[100%]" />
                    </div>

                    <div className="mb-6">
                        <label className="block text-black font-semibold mb-2">Type</label>

                        <select disabled={!isEditable} name="type" value={data.type} onChange={handleInputChange} className="bg-indigo-100 text-gray-800 p-3 rounded-md h-11 w-[100%]">
                            <option value="private">private</option>
                            <option value="public">public</option>
                            <option value="Conversation">Conversation</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-black font-semibold mb-2">Description</label>
                        <textarea disabled={!isEditable} name="description" value={data.description} onChange={handleInputChange} className="bg-indigo-100 text-gray-700 p-3 rounded-md max-h-44 w-[100%]">
                        </textarea>
                    </div>

                    <div className="mb-6">
                        <label className="block text-black font-semibold mb-2">Banne World</label>
                        <textarea disabled={!isEditable} name="bannedWords" value={data.bannedWords} onChange={handleInputChange}
                            className="bg-indigo-100 text-gray-700 p-3 rounded-md max-h-44 w-[100%]">

                        </textarea>
                    </div>
                    {editeButton && <div className='w-full flex justify-end'>
                        <button type='submit' className='w-28 h-10 bg-green-600 rounded-md text-white font-medium'>
                            Update
                        </button>
                    </div>

                    }

                </form>
            </div>
            <PopUp
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                onSubmit={handleSubmit}
            />
            <ToastContainer />
        </div >
    )
}
