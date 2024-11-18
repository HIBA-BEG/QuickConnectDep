import styled from 'styled-components';
import React, { useState } from 'react';
import SearchBarComponent from './SearchBar';
import defaultProfileIcon from '../profileicon.jpg';

const Groups = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 90%;
  height: 100vh;
`;

const GroupItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px 5px 0px 0px;
  border-bottom: 2px solid black;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#DBDCFF' : 'transparent')}; 
  &:hover {
    background-color: #ddd;
  }
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin-right: 10px;
  object-fit: cover;
`;

const GroupInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

interface AllChatProps {
  onGroupSelect: (groupName: string) => void;
  currentUserId: string;
}

const AllChat: React.FC<AllChatProps> = ({ onGroupSelect, currentUserId }) => {
  const [activeGroup, setActiveGroup] = useState<string | null>(null); 

  const handleGroupSelect = (groupName: string) => {
    setActiveGroup(groupName); 
    onGroupSelect(groupName); 
  };

  return (
    <Groups>
      <SearchBarComponent currentUserId={currentUserId} />
      {['Group 1', 'Group 2', 'Group 3'].map((groupName, index) => (
        <GroupItem
          key={index}
          onClick={() => handleGroupSelect(groupName)} 
          active={activeGroup === groupName} 
        >
        
          <ProfileImage src={defaultProfileIcon} alt={`${groupName} Profile`} />
          <GroupInfo>
            <h2>{groupName}</h2>
            <p>Last Message: Hello</p>
          </GroupInfo>
        </GroupItem>
      ))}
    </Groups>
  );
};

export default AllChat;
