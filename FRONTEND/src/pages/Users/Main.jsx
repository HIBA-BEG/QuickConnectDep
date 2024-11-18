import styled from 'styled-components';
import Sidebar from '../../Components/Sidebar';
import GroupeMessage from '../../Components/GroupesChat';
import InfoMessage from '../../Components/GroupInfo';
import FriendsChat from '../../Components/FriendsChat';
import React, { useState } from 'react';

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #2C2F33;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 90%;
  right: 75%;
  background-color: #7289DA;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #5a6db4;
  }
`;

const Main = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [isGroupChat, setIsGroupChat] = useState(true);

  const toggleChatType = () => {
    setIsGroupChat((prev) => !prev);
  };

  return (
    <MainContainer>
      <Sidebar />
      
      <ToggleButton onClick={toggleChatType}>
        {isGroupChat ? 'Switch to Friends Chat' : 'Switch to Group Chat'}
      </ToggleButton>
      
      {isGroupChat ? <GroupeMessage /> : <FriendsChat currentUserId={user._id} />}
      
      <InfoMessage />
    </MainContainer>
  );
};

export default Main;
