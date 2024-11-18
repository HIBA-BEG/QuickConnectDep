import { useEffect, useState } from 'react';
import { conversationService } from '../Api/conversation/Conversation.service';
import { User, userService } from '../Api/User.service';
import AllChatFiends from './AllFriends';
import defaultProfileIcon from '../profileicon.jpg';
import { io } from 'socket.io-client';
import styled from 'styled-components';

const ChatContainer = styled.div`
  flex: 2;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 10px;
`;

const MessageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-top: 20px;
  pading: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MessageInputContainer = styled.div`
  display: flex;
  padding: 10px;
  gap: 10px;
`;

const MessageInput = styled.div`
  display: flex;
  background-color: #DBDCFF;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
  border-radius: 20px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #E0E4EB;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  &:hover {
    background-color: #d1d4da;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: black;
`;

const FriendsWithChat = styled.div`
  flex: 2;
  background-color: #fff;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  gap: 40px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatusIndicator = styled.span<{ status: string }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: ${props =>
    props.status === 'online' ? '#28a745' :
    props.status === 'busy' ? '#dc3545' :
    '#666'
  };
`;

const MessageBubble = styled.div<{ isOwnMessage: boolean }>`
  max-width: fit-content;
  padding: 10px 15px;
  margin-bottom: auto;
  border-radius:${(props) => (props.isOwnMessage ? '25px 25px 0px 25px' : '25px 25px 25px 0px')} ;
  background-color: ${(props) => (props.isOwnMessage ? '#7577ED' : '#EEEEF8')};
  color:  ${(props) => (props.isOwnMessage ? 'white' : 'black')};
  align-self: ${(props) => (props.isOwnMessage ? 'flex-end' : 'flex-start')};
  word-wrap: break-word;
  box-shadow:rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

interface FriendsChatProps {
  currentUserId: string;
}

export interface Message {
  sender: string;
  text: string;
  timestamp: Date;
  Friend?: string; 
}

const socket = io('http://localhost:3001');

const FriendsChat: React.FC<FriendsChatProps> = ({ currentUserId }) => {
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [selectedFriendData, setSelectedFriendData] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchFriendData = async () => {
      if (selectedFriend) {
        try {
          const friendData = await userService.getUserById(selectedFriend);
          setSelectedFriendData(friendData);

          const conversation = await conversationService.getConversation(currentUserId, selectedFriend);
          setMessages(conversation?.messages || []);
        } catch (error) {
          console.error('Error fetching friend or conversation data:', error);
        }
      }
    };
    fetchFriendData();
  }, [selectedFriend, currentUserId]);

  useEffect(() => {
    socket.on('receiveMessage', (data: { senderId: string; receiverId: string; message: string }) => {
      if (data.senderId === selectedFriend || data.receiverId === selectedFriend) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: data.senderId, text: data.message, timestamp: new Date() },
        ]);
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [selectedFriend]);

  const handleSendMessage = async () => {
    if (newMessage && selectedFriend) {
      const newMessageData: Message = {
        sender: currentUserId,
        text: newMessage,
        timestamp: new Date(),
      };
  
      try {
        await conversationService.createConversation(currentUserId, selectedFriend, [newMessageData]);
  
        // Emit to socket
        socket.emit('sendMessage', {
          senderId: currentUserId,
          receiverId: selectedFriend,
          message: newMessage,
        });
  
        setMessages([...messages, newMessageData]);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
  

  return (
    <FriendsWithChat>
      <AllChatFiends onFriendselect={setSelectedFriend} currentUserId={currentUserId} />
      <ChatContainer>
        <ChatHeader>
          {selectedFriendData ? (
            <ProfileSection>
              <ProfileImage
                src={selectedFriendData.profilePicture || defaultProfileIcon}
                alt={`${selectedFriendData.firstName} Profile`}
              />
              <UserInfo>
                <h2 className="font-roboto font-bold text-[30px] text-[#132C33]">
                  {`${selectedFriendData.firstName} ${selectedFriendData.lastName}`}
                </h2>
                <p>@{selectedFriendData.username}</p>
              </UserInfo>
            </ProfileSection>
          ) : (
            <h2 className="font-roboto font-bold text-[30px] text-[#132C33]">
              Select a friend to start chatting
            </h2>
          )}
        </ChatHeader>
        <MessageContainer>
          {messages.map((message, index) => (
           <MessageBubble key={index} isOwnMessage={message.sender === currentUserId}>
           <strong>{message.sender === currentUserId ? 'You' : selectedFriendData?.firstName}:</strong><br /> {message.text}
         </MessageBubble>
          ))}
        </MessageContainer>
        <MessageInputContainer>
        <IconButton>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.06 2.1875C6.9375 2.1875 6 2.1875 5.2575 2.2875C4.4725 2.3925 3.76375 2.625 3.195 3.19375C2.625 3.76375 2.3925 4.4725 2.2875 5.25625C2.1875 6 2.1875 6.9375 2.1875 8.06V8.19C2.1875 9.3125 2.1875 10.25 2.2875 10.9925C2.3925 11.7775 2.625 12.4862 3.19375 13.055C3.76375 13.625 4.4725 13.8575 5.25625 13.9625C6 14.0625 6.9375 14.0625 8.06 14.0625H8.19C9.3125 14.0625 10.25 14.0625 10.9925 13.9625C11.7775 13.8575 12.4862 13.625 13.055 13.055C13.625 12.4862 13.8575 11.7775 13.9625 10.9925C14.0625 10.25 14.0625 9.3125 14.0625 8.19V8.06C14.0625 6.9375 14.0625 6 13.9625 5.2575C13.8575 4.4725 13.625 3.76375 13.055 3.195C12.4862 2.625 11.7775 2.3925 10.9925 2.2875C10.25 2.1875 9.3125 2.1875 8.19 2.1875H8.06ZM4.52 4.52C4.6825 4.3575 4.93 4.22375 5.5075 4.145C6.11 4.065 6.92 4.0625 8.125 4.0625C9.33 4.0625 10.14 4.065 10.7438 4.14625C11.32 4.22375 11.5675 4.3575 11.73 4.52125C11.8925 4.685 12.0262 4.93 12.105 5.50625C12.185 6.11 12.1875 6.92 12.1875 8.125C12.1875 9.33 12.185 10.14 12.1037 10.7438C12.0262 11.32 11.8925 11.5675 11.7288 11.73C11.565 11.8925 11.32 12.0262 10.7438 12.105C10.14 12.185 9.33 12.1875 8.125 12.1875C6.92 12.1875 6.11 12.185 5.50625 12.1037C4.93 12.0262 4.6825 11.8925 4.52 11.7288C4.3575 11.565 4.22375 11.32 4.145 10.7438C4.06625 10.14 4.0625 9.33 4.0625 8.125C4.0625 6.92 4.065 6.11 4.14625 5.50625C4.22375 4.93 4.3575 4.6825 4.52125 4.52" fill="#1E1E1E" />
              <path d="M22.8125 4.375C22.8125 4.12636 22.7137 3.8879 22.5379 3.71209C22.3621 3.53627 22.1236 3.4375 21.875 3.4375C21.6264 3.4375 21.3879 3.53627 21.2121 3.71209C21.0363 3.8879 20.9375 4.12636 20.9375 4.375V7.1875H18.125C17.8764 7.1875 17.6379 7.28627 17.4621 7.46209C17.2863 7.6379 17.1875 7.87636 17.1875 8.125C17.1875 8.37364 17.2863 8.6121 17.4621 8.78791C17.6379 8.96373 17.8764 9.0625 18.125 9.0625H20.9375V11.875C20.9375 12.1236 21.0363 12.3621 21.2121 12.5379C21.3879 12.7137 21.6264 12.8125 21.875 12.8125C22.1236 12.8125 22.3621 12.7137 22.5379 12.5379C22.7137 12.3621 22.8125 12.1236 22.8125 11.875V9.0625H25.625C25.8736 9.0625 26.1121 8.96373 26.2879 8.78791C26.4637 8.6121 26.5625 8.37364 26.5625 8.125C26.5625 7.87636 26.4637 7.6379 26.2879 7.46209C26.1121 7.28627 25.8736 7.1875 25.625 7.1875H22.8125V4.375Z" fill="#1E1E1E" />
              <path fillRule="evenodd" clipRule="evenodd" d="M21.81 15.9375H21.94C23.0637 15.9375 24 15.9375 24.7425 16.0375C25.5275 16.1425 26.2362 16.375 26.805 16.945C27.375 17.5137 27.6075 18.2225 27.7125 19.0075C27.8125 19.75 27.8125 20.6862 27.8125 21.81V21.94C27.8125 23.0638 27.8125 24 27.7125 24.7425C27.6075 25.5275 27.375 26.2362 26.805 26.805C26.2362 27.375 25.5275 27.6075 24.7425 27.7125C24 27.8125 23.0637 27.8125 21.94 27.8125H21.81C20.6875 27.8125 19.75 27.8125 19.0075 27.7125C18.2225 27.6075 17.5138 27.375 16.945 26.805C16.375 26.2362 16.1425 25.5275 16.0375 24.7425C15.9375 24 15.9375 23.0638 15.9375 21.94V21.81C15.9375 20.6862 15.9375 19.75 16.0375 19.0075C16.1425 18.2225 16.375 17.5137 16.945 16.945C17.5138 16.375 18.2225 16.1425 19.0075 16.0375C19.75 15.9375 20.6863 15.9375 21.81 15.9375ZM19.2563 17.895C18.68 17.9737 18.4325 18.1075 18.27 18.27C18.1075 18.4325 17.9738 18.68 17.895 19.2575C17.815 19.86 17.8125 20.67 17.8125 21.875C17.8125 23.08 17.815 23.89 17.895 24.4937C17.9738 25.07 18.1075 25.3175 18.27 25.48C18.4325 25.6425 18.68 25.7762 19.2575 25.855C19.86 25.935 20.67 25.9375 21.875 25.9375C23.08 25.9375 23.89 25.935 24.4937 25.8538C25.07 25.7763 25.3175 25.6425 25.48 25.4787C25.6425 25.315 25.7763 25.07 25.855 24.4937C25.935 23.89 25.9375 23.08 25.9375 21.875C25.9375 20.67 25.935 19.86 25.8538 19.2562C25.7763 18.68 25.6425 18.4325 25.4787 18.27C25.315 18.1075 25.07 17.9737 24.4937 17.895C23.89 17.815 23.08 17.8125 21.875 17.8125C20.67 17.8125 19.86 17.815 19.2563 17.895ZM8.06 15.9375C6.9375 15.9375 6 15.9375 5.2575 16.0375C4.4725 16.1425 3.76375 16.375 3.195 16.945C2.625 17.5137 2.3925 18.2225 2.2875 19.0075C2.1875 19.75 2.1875 20.6862 2.1875 21.81V21.94C2.1875 23.0638 2.1875 24 2.2875 24.7425C2.3925 25.5275 2.625 26.2362 3.19375 26.805C3.76375 27.375 4.4725 27.6075 5.25625 27.7125C6 27.8125 6.9375 27.8125 8.06 27.8125H8.19C9.3125 27.8125 10.25 27.8125 10.9925 27.7125C11.7775 27.6075 12.4862 27.375 13.055 26.805C13.625 26.2362 13.8575 25.5275 13.9625 24.7425C14.0625 24 14.0625 23.0638 14.0625 21.94V21.81C14.0625 20.6862 14.0625 19.75 13.9625 19.0075C13.8575 18.2225 13.625 17.5137 13.055 16.945C12.4862 16.375 11.7775 16.1425 10.9925 16.0375C10.25 15.9375 9.3125 15.9375 8.19 15.9375H8.06ZM4.52 18.27C4.6825 18.1075 4.93 17.9737 5.5075 17.895C6.11 17.815 6.92 17.8125 8.125 17.8125C9.33 17.8125 10.14 17.815 10.7438 17.895C11.32 17.9737 11.5675 18.1075 11.73 18.27C11.8925 18.4325 12.0262 18.68 12.105 19.2575C12.185 19.86 12.1875 20.67 12.1875 21.875C12.1875 23.08 12.185 23.89 12.1037 24.4937C12.0262 25.07 11.8925 25.3175 11.7288 25.48C11.565 25.6425 11.32 25.7762 10.7438 25.855C10.14 25.935 9.33 25.9375 8.125 25.9375C6.92 25.9375 6.11 25.935 5.50625 25.8538C4.93 25.7763 4.6825 25.6425 4.52 25.4787C4.3575 25.315 4.22375 25.07 4.145 24.4937C4.065 23.89 4.0625 23.08 4.0625 21.875C4.0625 20.67 4.065 19.86 4.14625 19.2562C4.22375 18.68 4.3575 18.4325 4.52125 18.27" fill="#1E1E1E" />
            </svg>
          </IconButton>
          <MessageInput>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
            />
            
          </MessageInput>
          <IconButton onClick={handleSendMessage}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink">
              <rect width="30" height="30" fill="url(#pattern0_19_766)" />
              <defs>
                <pattern id="pattern0_19_766" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlinkHref="#image0_19_766" transform="scale(0.0111111)" />
                </pattern>
                <image id="image0_19_766" width="90" height="90" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD7ElEQVR4nO2dS0tVURTHf6ClUdSwzKDC+gI9RhVFWOEgskEFPaD3xEArTJs1yxyF4Nfo5aDQD1CEYdmkSTXpnY8adQVzxYFVxMXHLffZZ51z1w/+IJd7Ze8/m733WmftfcBxHMdxHMdxHMepmBpgO3AO6AXuAaPAa2ACmFJN6Gej+p1b+ptt+j+cWVgHdAADwHdAFqlvwAOgHWikylkGnAKGgJ8BzJ1L08AgcBKop4pYoSPtfYrmzqUvwA1gFQVmCdAJjGdgcLmSNlzVNhWKXcBLAwaX6xXQTAFI5sR+YMaAqXMpaVsfUEdO2QA8MWCkVKhnwCZyRnOgbZpEVrIt3EtOOAz8MGCa/KeSYOgYxrmY8p5YIinpwwWM0qrBQdYmSUCzj2KMZF4rGTBHUphG9mOEzTld+OQfFsimrE2u022RFFzDWe+z+w2YIJGUBDWZhdWWIz4JrKSvu2ObXAu8MNB5iayXsRNRnQY6LRnpcsx88piBDktGGlMPUqfLQGclYyW57NQfP30yEkh0AWtUXZEDpg9pPxY7ZcBkUWPLaYls9ok0jR4yYLLoKJ6NAxEzhw/TMrnRUNJozTztjGX2z7RKGToMGCyq7gXaGmsauZSG0QMGDBZVSc3M2uy7oU1OSqwmDRgsZTuPgwu0O+1pZDJ0+dl2A8aK0ZG9NaTR5w2YKkZH9pmQRvcaMFSMmn0zpNH3DZgpRs2+E9LovKRESxnM2SMhjX4bcNR1Ag1kS0iz34RsWKi06DXs0B2oT19DNmoqUKMasMPqgNOVOaPXYoe1Fo0eSzG9mRXXLU4dIRfDLgMj2+xi6Ns74mzvPGAhTsDiIThxQvBzgeYzKWBS6XRIoz1NypxGbwlptCf+iZP4R89WixGVDCT8gy+Ev2k3YLBUGPjEejjblobRSZDh5Qb8MXl6gbKHRTFoYDRL0Qto0KsYxGhdR0vkkrDjaRc5fjSyd+7WtGuD/h3T5Pcx7v6o5iJ0UV0hAss1NShVqrFYhehoIbZUqdqJfFjouYFOS9EPCyXs9ONv8egzMMokkm6TIXV6fFcKrqfAUjKmSQ+mS0E1CWzECHtyfuuMzBMY7cMYhwwlnSTQGZUjGOVCQa76mdaacNO05nwaKVm84me+q3++5XTh20POWA88NmCeVKhhC1f6LGaf3Wc8gpzRYCTzfXKocP2FAVPLlbRpBwWjVi8VsZBi/apZuKRNhWW5dvJdBgZ/1ou6V1JF1OtVDI9SDnSm9UHq8Wq7en42GvQA+119G8VizZ3Q/9WWZklA3qnRerazQI9WA43oq0DG/3o9yLh+NqLf6dFTrMlv/fUgjuM4juM4juM4VMgvsFJQNF1us8cAAAAASUVORK5CYII=" />
              </defs>
            </svg>

            </IconButton>
        </MessageInputContainer>
      </ChatContainer>
    </FriendsWithChat>
  );
};

export default FriendsChat;
