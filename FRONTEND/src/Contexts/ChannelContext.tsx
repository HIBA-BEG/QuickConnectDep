import React, { ReactNode, useEffect, useState, createContext } from "react";
import { getChannels } from "../Api/channelAPI/channelApi";
import { Channel } from "../Types/Channel";

interface ChannelContextType {
    channels: Channel[] | null;
    updateChannel: (updatedChannel: Channel) => void;
    removeChannel: (channelId: string | number) => void;
    addChannel: (newChannel: Channel) => void;

}

export const ChannelContext = createContext<ChannelContextType | undefined>(undefined);

interface ChannelProviderProps {
    children: ReactNode;
}
const ChannelProvider: React.FC<ChannelProviderProps> = ({ children }) => {
    const [channels, setChannels] = useState<Channel[] | null>(null);

    const fetchChannels = async () => {
        const data = await getChannels();
        setChannels(data);
    }

    useEffect(() => {
        fetchChannels()
    }, [])

    // ======
    const addChannel = (newChannel: Channel) => {
        setChannels((prev) => {
            if (prev) {
                return [...prev, newChannel]; // Ajoute le nouveau channel à la liste existante
            }
            return [newChannel]; // Si la liste est vide, initialise avec le nouveau channel
        });
    };

    const updateChannel = (updatedChannel: Channel) => {
        setChannels((prevChannel) => {
            if (prevChannel) {
                const updatedChannels = prevChannel.map((channel) => {
                    if (channel._id === updatedChannel._id) {
                        return updatedChannel;
                    } else {
                        return channel;
                    }
                });
                return updatedChannels;
            } else {
                return prevChannel;
            }
        });
    };

    const removeChannel = (channelId: string | number) => {
        setChannels((prev) => {
            if (prev) {
                const filteredChannels = prev.filter((channel) => channel._id !== channelId);
                return filteredChannels;
            } else {
                return prev;
            }
        });
    };


    const value = {
        channels,
        updateChannel,
        removeChannel,
        addChannel
    };



    return (
        <ChannelContext.Provider value={value}>
            {children}
        </ChannelContext.Provider>
    );
}

export default ChannelProvider;