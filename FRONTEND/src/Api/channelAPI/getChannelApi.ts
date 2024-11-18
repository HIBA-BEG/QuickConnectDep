import api from '../ConfigueAxios';


export const getChannel = async (id : any) => {
    
    const response = await api.get(`/channel/${id}`);
    return response.data;
};