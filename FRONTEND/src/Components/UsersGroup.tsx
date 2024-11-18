import React, { useState, MouseEvent } from 'react';
import styled from 'styled-components';

interface User {
  id: number;
  name: string;
  role: string;
}

interface UsersGroupProps {
  users: User[];
}

const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 90%;
`;

const Button = styled.button`
  background-color: white;
  color: black;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: grey;
  }
`;

const UsersGroup: React.FC<UsersGroupProps> = ({ users }) => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const togglePopup = (event: MouseEvent) => {
    event.stopPropagation();
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <UsersContainer>
      <h1   className="font-roboto-mono font-bold text-[26px] leading-[42px] tracking-[0.05em] text-[#000000]">{users.length} Members</h1>
      {users.slice(0, 3).map((user: User) => (
        <div key={user.id} className='flex justify-between'>
            <p>{user.name}</p>
            <p>{user.role}</p>  
        </div>
      ))}
      {users.length > 3 && (
        <Button onClick={togglePopup}>Show All Members</Button>
      )}

      {isPopupOpen && (
        <PopupOverlay onClick={togglePopup}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <h4>All Members</h4>
            {users.map((user: User) => (
               <div key={user.id} className='flex justify-between'>
                    <p>{user.name}</p>
                    <p>{user.role}</p>  
               </div>
            ))}
            <Button onClick={togglePopup}>Close</Button>
          </PopupContent>
        </PopupOverlay>
      )}
    </UsersContainer>
  );
};

export default UsersGroup;
