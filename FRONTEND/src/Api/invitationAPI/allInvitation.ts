import api from '../ConfigueAxios';
interface User {
    _id: string;
}

export const allInvitation = async () => {
    const userString = localStorage.getItem('user');
    if (!userString) {
        throw new Error('User not found in localStorage');
      }
    const user: User = JSON.parse(userString);
    const response = await api.get(`/invitation/pending/${user._id}`);
    console.log('all requests:', response.data);
    return response.data;
};