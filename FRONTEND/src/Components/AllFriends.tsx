import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import SearchBarComponent from './SearchBar';
import defaultProfileIcon from '../profileicon.jpg';
import { User, userService } from '../Api/User.service';

const Friends = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 90%;
  height: 100vh;
`;

const FriendItem = styled.div<{ active?: boolean }>`
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

const LoadingState = styled.div`
  padding: 20px;
  text-align: center;
  color: #666;
`;

const ErrorState = styled.div`
  padding: 20px;
  text-align: center;
  color: #dc3545;
`;

const EmptyState = styled.div`
  padding: 20px;
  text-align: center;
  color: #666;
  font-style: italic;
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

interface AllChatProps {
  onFriendselect: (friendId: string) => void;
  currentUserId: string;
}

const AllChatFiends: React.FC<AllChatProps> = ({ onFriendselect, currentUserId }) => {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [friends, setFriends] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFriends = async () => {
      setIsLoading(true);
      try {
        const friendsList = await userService.getUserFriends(currentUserId);
        console.log('Fetched friends:', friendsList);
        setFriends(friendsList);
        setError(null);
      } catch (err) {
        console.error('Error fetching friends:', err);
        setError('Failed to load friends');
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUserId) {
      fetchFriends();
    }
  }, [currentUserId]);

  const handleFriendselect = (friendId: string) => {
    setActiveGroup(friendId);
    onFriendselect(friendId);
  };

  if (isLoading) return <div>Loading friends...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Friends>
      <SearchBarComponent currentUserId={currentUserId} />
      {isLoading ? (
        <LoadingState>Loading friends...</LoadingState>
      ) : error ? (
        <ErrorState>Error: {error}</ErrorState>
      ) : friends.length === 0 ? (
        <EmptyState>
          <div>No friends yet</div>
        </EmptyState>
      ) : (
        friends.map((friend) => (
          <FriendItem
            key={friend._id}
            onClick={() => handleFriendselect(friend._id)}
            active={activeGroup === friend._id}
          >
            <ProfileImage
              src={friend.profilePicture || defaultProfileIcon}
              alt={`${friend.firstName} Profile`}
            />
            <GroupInfo>
              <h2>
                <StatusIndicator status={friend.status} />
                {`${friend.firstName} ${friend.lastName}`}
              </h2>
              <p>@{friend.username}</p>
              <small>{new Date(friend.lastSeen).toLocaleString()}</small>
            </GroupInfo>
          </FriendItem>
        ))
      )}
    </Friends>
  );
};

export default AllChatFiends;
