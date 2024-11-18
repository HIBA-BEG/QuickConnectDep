import api from '../ConfigueAxios';

export const rejecteInvitation = async (invitationId : any) => {
    const response = await api.put(`/invitation/${invitationId}/reject`);
    console.log('all requests:', response.data);
    return response.data;
 };