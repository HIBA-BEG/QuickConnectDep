import { Channel } from '../../Types/Channel';
import api from '../ConfigueAxios';

export const addChannel = async (data: Partial<Channel>) => {
    try {
        const response = await api.post('/channel', data);
        return response.data;
    } catch (error: any) {
        console.error('error' , error);
        
    }
};