import axios from 'axios';

interface Message {
  sender: string;
  text: string;
  timestamp: Date;
}

interface Conversation {
  senderId: string;
  receiverId: string;
  messages: Message[];
}

axios.defaults.baseURL = 'http://localhost:3001';

export const conversationService = {
  async getConversation(senderId: string, receiverId: string): Promise<Conversation> {
    try {
      const response = await axios.get<Conversation>(`/conversations/${senderId}/${receiverId}`);
      
      console.log('API Response:', response.data);
  
      if (response.data && response.data.messages) {
        console.log('Conversation fetched successfully:', response.data);
        return response.data;
      } else {
        console.error('Conversation data is invalid or null:', response.data);
        return { senderId, receiverId, messages: [] }; 
      }
    } catch (error: any) {
      console.error('Error fetching conversation:', error.response?.data || error.message);
      return { senderId, receiverId, messages: [] }; 
    }
  },
  

  async createConversation(senderId: string, receiverId: string, messages: Message[]): Promise<Conversation> {
    try {
      const response = await axios.post<Conversation>('/conversations', { senderId, receiverId, messages });
      console.log('Conversation created successfully:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error creating conversation:', error.response?.data || error.message);
      return { senderId, receiverId, messages: [] }; 
    }
  }
};
