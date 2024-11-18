import api from '../ConfigueAxios';

export const acceptedInvitation = async (invitationId : any) => {
    const response = await api.put(`/invitation/${invitationId}/accept`);
    console.log('all requests:', response.data);
    return response.data;
 };