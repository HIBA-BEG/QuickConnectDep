import api from '../ConfigueAxios';
interface User {
    _id: string;
}

export const getChannels = async () => {
    const userString = localStorage.getItem('user');
    if (!userString) {
        throw new Error('User not found in localStorage');
      }
    const user: User = JSON.parse(userString);
    const response = await api.get(`/channel/modertor/${user._id}`);
    return response.data;
};