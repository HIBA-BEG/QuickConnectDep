import { Channel } from '../../Types/Channel';
import api from '../ConfigueAxios';

export const deleteChannel = async ( id: any) => {
    const response = await api.delete(`/channel/${id}`); 
    return response.data;
};