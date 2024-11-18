import React, { useState, useContext } from 'react'
import Sidebar from '../../Components/Sidebar';
import AllGroupsAndFriend from '../../Components/channelComponents/AllGroupsAndFriend';
import ChannelInfo from '../../Components/channelComponents/ChannelInfo';
import Groups from '../../Components/channelComponents/Groups';
import Members from '../../Components/channelComponents/Members';
import AddForm from '../../Components/channelComponents/AddForm';
import { ChannelContext } from '../../Contexts/ChannelContext'
import { Channel, MembersType } from "../../Types/Channel";
import userGroupIcon from '../../user-group.png'


export default function IndexChannel() {
    const [showAddForm, setShowAddForm] = useState(false)
    const [members, setMembers] = useState<MembersType[]>([]);
    const [channelInfo, setChannelInfo] = useState<Channel[]>([]);



    const channelContext = useContext(ChannelContext);
    const channels = channelContext?.channels || [];

    const addForm = () => {
        setShowAddForm(!showAddForm)
    }



    return (
        <div className='bg-[#2C2F33] flex'>

            <Sidebar />
            <div className='flex  w-[100vw] min-h-screen mx-2 my-5 gap-5'>

                <div className='flex  bg-white h-[100%] w-[70%] rounded-[30px]'>
                    <div className='w-[30%] h-[100%] flex items-center '>
                        <div className='flex flex-col  w-[100%] h-[80%] '>
                            <span className='ml-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path fill="#303030" d="M24 32C10.7 32 0 42.7 0 56L0 456c0 13.3 10.7 24 24 24l16 0c13.3 0 24-10.7 24-24L64 56c0-13.3-10.7-24-24-24L24 32zm88 0c-8.8 0-16 7.2-16 16l0 416c0 8.8 7.2 16 16 16s16-7.2 16-16l0-416c0-8.8-7.2-16-16-16zm72 0c-13.3 0-24 10.7-24 24l0 400c0 13.3 10.7 24 24 24l16 0c13.3 0 24-10.7 24-24l0-400c0-13.3-10.7-24-24-24l-16 0zm96 0c-13.3 0-24 10.7-24 24l0 400c0 13.3 10.7 24 24 24l16 0c13.3 0 24-10.7 24-24l0-400c0-13.3-10.7-24-24-24l-16 0zM448 56l0 400c0 13.3 10.7 24 24 24l16 0c13.3 0 24-10.7 24-24l0-400c0-13.3-10.7-24-24-24l-16 0c-13.3 0-24 10.7-24 24zm-64-8l0 416c0 8.8 7.2 16 16 16s16-7.2 16-16l0-416c0-8.8-7.2-16-16-16s-16 7.2-16 16z" /></svg>
                            </span>
                            <AllGroupsAndFriend />
                            <AllGroupsAndFriend />
                        </div>

                    </div>
                    <div className='w-[100%]'>

                        {showAddForm ? <AddForm /> : <ChannelInfo channelInfo={channelInfo} />}

                    </div>

                </div>
                <div className=' flex flex-col gap-4 h-[100%] w-[30%]'>

                    <div className='w-full h-1/2 bg-white rounded-[30px]'>
                        <div className='flex justify-around items-center mt-2'>

                            <h1 className='text-3xl font-medium'>MY Group</h1>
                            <span onClick={addForm} className='cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 " viewBox="0 0 448 512"><path fill="#a3a3a3" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" /></svg>
                            </span>
                        </div>

                        <div className="w-full  flex flex-col  items-center overflow-y-auto h-72 overflow-auto">




                            {channels.length > 0 ?
                                channels.map((item: Channel, index: number) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setMembers(item.members);
                                            setChannelInfo([item])
                                        }}
                                        className='cursor-pointer'>

                                        <Groups name={item.name} />
                                    </div>

                                )) :
                                <div className='h-full flex items-center'>
                                    <p>No Groups created</p>
                                </div>
                            }

                        </div>


                    </div>
                    <div className='w-full h-1/2 bg-[#DBDCFF] rounded-[30px]'>
                        <div className=' pl-16 mt-2'>

                            <h1 className='text-3xl font-medium'>{members.length} Members</h1>

                        </div>

                        <div className="w-full  flex flex-col  items-center overflow-y-auto h-72 overflow-auto">

                            {members.length > 0 ? (
                                members.map((member, index) => (
                                    <Members key={index} firstName={member.firstName} lastName={member.lastName} />
                                ))
                            ) : (
                                <div className='w-full h-full '>

                                    <img src={userGroupIcon} className='w-full h-full' alt="" />

                                </div>
                            )}
                        </div>


                    </div>


                </div>

            </div>
        </div>

    );
}
