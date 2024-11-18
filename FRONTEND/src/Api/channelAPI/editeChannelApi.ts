import { Channel } from '../../Types/Channel';
import api from '../ConfigueAxios';

export const editeChannel = async (data: Partial<Channel>, id: any) => {
    const response = await api.put(`/channel/${id}`, data); 
    return response.data;
};