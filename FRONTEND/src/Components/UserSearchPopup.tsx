import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTimes, FaUserPlus } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { userService } from '../Api/User.service';
import defaultProfileIcon from '../profileicon.jpg';
import Swal from 'sweetalert2';


const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: #1E1E1E;
  padding: 40px;
  border-radius: 10px;
  width: 90%;
  max-width: 800px;
  max-height: 70vh;
  overflow-y: auto;
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  background-color: #EEEEF8;
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 23px;
  font-weight: 500;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background-color: #DBDCFF;
  cursor: pointer;
  font-size: 23px;
  font-weight: 500;
  
  &:hover {
    background-color: #EEEEF8;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const AddFriendButton = styled.button`
  background: #7577ED;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    background: #5557cd;
  }
`;

interface UserSearchPopupProps {
    onClose: () => void;
    currentUserId: string;
}

const UserSearchPopup: React.FC<UserSearchPopupProps> = ({ onClose, currentUserId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState<any[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await userService.getAllUsers();
                const filteredData = data.filter(user => user._id !== currentUserId);
                setUsers(filteredData);
                setFilteredUsers(filteredData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [currentUserId]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);

        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(term.toLowerCase()) ||
            user.lastName.toLowerCase().includes(term.toLowerCase()) ||
            user.firstName.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const [pendingRequests, setPendingRequests] = useState<Set<string>>(new Set());

    const handleAddFriend = async (userId: string) => {
        try {
            if (pendingRequests.has(userId)) {
                Swal.fire({
                    icon: 'info',
                    title: 'Already Sent',
                    text: 'Friend request already sent',
                    confirmButtonColor: '#7577ED'
                });
                return;
            }

            console.log('Sending friend request to:', userId);

            const response = await userService.sendFriendRequest(userId);
            console.log('Friend request response:', response);

            setPendingRequests(prev => new Set(prev).add(userId));
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Friend request sent successfully!',
                confirmButtonColor: '#7577ED'
            });
        } catch (error) {
            console.error('Error sending friend request:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to send friend request. Please try again.',
                confirmButtonColor: '#7577ED'
            });
        }
    };

    return (
        <PopupOverlay onClick={onClose}>
            <PopupContent onClick={e => e.stopPropagation()}>
                <CloseButton onClick={onClose}>
                    <FaTimes />
                </CloseButton>

                <SearchInput>
                    <Input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={handleSearch}
                        autoFocus
                    />
                    <FiSearch size={25} style={{ marginRight: '10px', color: '#7577ED', fontWeight: 'semibold' }} />
                </SearchInput>

                <UserList>
                    {filteredUsers.map(user => (
                        <UserItem key={user._id}>
                            <img
                                src={user.profilePicture || defaultProfileIcon}
                                alt={user.lastName}
                                style={{ width: 50, height: 50, borderRadius: '20%', marginRight: 10 }}
                            />
                            <div style={{ flex: 1 }}>
                                <div>{user.username}</div>
                                <div style={{ fontSize: '0.8em', color: '#666' }}>{user.lastName} {user.firstName}</div>
                            </div>
                            <AddFriendButton onClick={(e) => {
                                e.stopPropagation();
                                handleAddFriend(user._id);
                            }}
                                disabled={pendingRequests.has(user._id)}
                                style={{
                                    backgroundColor: pendingRequests.has(user._id) ? '#ccc' : '#7577ED'
                                }}
                            >
                                {pendingRequests.has(user._id) ? (
                                    'Request Sent'
                                ) : (
                                    <>
                                        <FaUserPlus /> Add Friend
                                    </>
                                )}
                            </AddFriendButton>
                        </UserItem>
                    ))}
                </UserList>
            </PopupContent>
        </PopupOverlay>
    );
};

export default UserSearchPopup;