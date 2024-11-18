import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NotificationItem from './NotificationItem';
import { userService, User, FriendRequest } from '../../Api/User.service';
import Swal from 'sweetalert2';
import { io } from 'socket.io-client';
import { allInvitation } from '../../Api/invitationAPI/allInvitation';
import { Invitation } from '../../Types/invitation';
import { acceptedInvitation } from '../../Api/invitationAPI/acceptedInvetationApi';
import { rejecteInvitation } from '../../Api/invitationAPI/rejectInvitationApi';

const ContainerForAll = styled.div`
  flex: 2;
  background-color: #fff;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  gap: 40px;

   @media (max-width: 768px) {
    margin: 10px;
    padding: 15px;
    margin-left: 19%; 
    width: 80%;
    gap: 20px;
  }
`;

const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  padding: 20px;
  width:100%;
  background-color: #f0f0f0;

  @media (max-width: 768px) {
    padding: 15px;
    border-radius: 20px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;

   @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 8px;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  padding: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

interface NotificationPageProps {
  currentUserId: string;
}


const NotificationPage: React.FC<NotificationPageProps> = ({ currentUserId }) => {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [invitation, setInvitation] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGroupChat, setIsGroupChat] = useState(true);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // console.log('User localStorage ', user);

    const fetchFriendRequests = async () => {

      setIsLoading(true);
      try {
        const requests = await userService.getPendingFriendRequests(user._id);
        // console.log('Fetched requests ', requests);

        const pendingRequests = requests.filter(req => req.status === "Pending");
        console.log('Pending requests:', pendingRequests);

        setFriendRequests(pendingRequests);
        setError(null);
      } catch (err) {
        setError('Failed to load friend requests');
        console.error('Err fetchFriendRequests:', err);
      } finally {
        setIsLoading(false);
      }
    };

    // ===========================get all invitation===================

    const fetchInvitation = async () => {
      try {
        const requests = await allInvitation();

        const pendingInvitation = requests.filter((req: any) => req.status === "Pending");
        setInvitation(pendingInvitation)
        setError(null);
      } catch (err) {
        setError('Failed to load invitation');
        console.error('Err fetchInvitation:', err);

      }

    }

    fetchFriendRequests();
    fetchInvitation();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // console.log('User localStorage ', user);

    console.log('Setting up WebSocket for user:', user.username, user._id);

    const newSocket = io('http://localhost:3001');

    newSocket.on('connect', () => {
      // console.log('Connected to WebSocket server');
      newSocket.emit('register', user._id);
      // console.log('Emitted register event with userId:', user._id);

    });

    newSocket.on('friendRequest', (request) => {
      console.log('Received friend request via WebSocket:', request);

      setFriendRequests(prev => {
        // console.log('Previous requests:', prev);
        const newRequests = [...prev, request];
        // console.log('Updated requests:', newRequests);
        return newRequests;
      });

      Swal.fire({
        icon: 'info',
        title: 'New Friend Request',
        text: `${request.from.firstName} ${request.from.lastName} sent you a friend request`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
    });

    // =====================invitation==================
    newSocket.on('invitation', (invitation) => {
      console.log('Received group invitation via WebSocket:', invitation);

      Swal.fire({
        icon: 'info',
        title: 'New Group Invitation',
        text: `${invitation.from.firstName} ${invitation.from.lastName} invited you to join the group: ${invitation.channel.name}`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });

      // Mettre à jour l'état des invitations, si vous voulez gérer une liste d'invitations
      setInvitation(prev => {
        const newRequests = [...prev, invitation];
        return newRequests;
      });
    });

    // newSocket.on('error', (error) => {
    //   console.error('WebSocket error:', error);
    // });

    // newSocket.on('disconnect', () => {
    //   console.log('Disconnected from WebSocket server');
    // });

    setSocket(newSocket);

    return () => {
      // console.log('Cleaning up WebSocket connection');
      newSocket.close();
    };
  }, []);

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await userService.acceptFriendRequest(requestId);
      setFriendRequests(prev => prev.filter(req => req._id !== requestId));
      // console.log('Friend request accepted');

      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = await userService.getUserById(user._id);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      await Swal.fire({
        icon: 'success',
        title: 'Friend Request Accepted!',
        text: 'You are now friends',
        showConfirmButton: false,
        timer: 1500,
        position: 'top-end',
        toast: true
      });


    } catch (error) {
      console.error('Error accepting friend request:', error);

      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to accept friend request',
        showConfirmButton: true,
        position: 'center'
      });
    }
  };
  // ========================== acceptes invitation===================
 const handleAcceptInvitation = async(requestId: string | number)=>{

  try {

    
    await acceptedInvitation(requestId);
    setInvitation(prev => prev.filter(req => req._id !== requestId));

    await Swal.fire({
      icon: 'success',
      title: 'Invitation Accepted!',
      text: 'You are now joind channel',
      showConfirmButton: false,
      timer: 1500,
      position: 'top-end',
      toast: true
    });


  } catch (error) {
    console.error('Error accepting invitation:', error);

    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Failed to accept invitation',
      showConfirmButton: true,
      position: 'center'
    });
  }


 }

  const handleRejectRequest = async (requestId: string) => {
    try {
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'Do you want to reject this friend request?',
        showCancelButton: true,
        confirmButtonText: 'Yes, reject it',
        cancelButtonText: 'No, cancel',
        confirmButtonColor: '#7678ED',
        cancelButtonColor: '#DBDCFF',
      });

      if (result.isConfirmed) {
        await userService.rejectFriendRequest(requestId);
        setFriendRequests(prev => prev.filter(req => req._id !== requestId));
        // console.log('Friend request rejected');

        await Swal.fire({
          icon: 'success',
          title: 'Friend Request Rejected',
          showConfirmButton: false,
          timer: 1500,
          position: 'top-end',
          toast: true
        });
      }
    } catch (error) {
      console.error('Error rejecting friend request:', error);

      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to reject friend request',
        showConfirmButton: true,
        position: 'center'
      });

    }
  };

  // ========================rejected invetation=======================
  const handleRejectInvitation = async(requestId: string | number)=>{

    try {
  
      
      await rejecteInvitation(requestId);
      setInvitation(prev => prev.filter(req => req._id !== requestId));
  
      await Swal.fire({
        icon: 'success',
        title: 'Invitation Rejected!',
        text: 'You are rejected this invitation',
        showConfirmButton: false,
        timer: 1500,
        position: 'top-end',
        toast: true
      });
  
  
    } catch (error) {
      console.error('Error rejected invitation:', error);
  
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to rejected invitation',
        showConfirmButton: true,
        position: 'center'
      });
    }
  
  
   }

  const handleFriendSelect = (friendId: string) => {
    console.log("Friend selected:", friendId);
  };

  const handleGroupSelect = (groupId: string) => {
    console.log("Group selected:", groupId);
  };

  const toggleChatType = () => {
    setIsGroupChat((prev) => !prev);
  };

  const sortedFriendRequests = [...friendRequests].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  const sortedInvitation = [...invitation].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  console.log(sortedInvitation);
  



  return (
    <ContainerForAll>
      <NotificationContainer>
        <Title>NOTIFICATIONS</Title>

        {isLoading && <LoadingSpinner>Loading...</LoadingSpinner>}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {!isLoading && !error && friendRequests.length === 0 && invitation.length === 0 && (
          <EmptyState>No new notifications</EmptyState>
        )}

        {sortedFriendRequests.map((request) => (
          <NotificationItem
            key={request._id}
            type="Friend Request"
            sender={`${request.from.firstName} ${request.from.lastName}`}
            message={`@${request.from.username} sent you a friend request`}
            timestamp={new Date(request.createdAt).toLocaleString()}
            onAccept={() => handleAcceptRequest(request._id)}
            onReject={() => handleRejectRequest(request._id)}
          />
        ))}
        {sortedInvitation.map((invitation) => (
          <NotificationItem
            key={invitation._id}
            type="Invitation"
            sender={`${invitation.from.firstName} ${invitation.from.lastName}`}
            message={`@${invitation.from.username} sent you to join group / ${invitation.channel.name} `}
            timestamp={new Date(invitation.createdAt).toLocaleString()}
            onAccept={() => handleAcceptInvitation(invitation._id!)}
            onReject={() => handleRejectInvitation(invitation._id!)}
          />
        ))}
      </NotificationContainer>
    </ContainerForAll>
  );
};

export default NotificationPage;
