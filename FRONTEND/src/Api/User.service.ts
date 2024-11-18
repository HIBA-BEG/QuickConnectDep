const apiUrl = 'http://localhost:3001';

export enum UserStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  BUSY = 'busy',
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  status: string;
  channels: any[];
  friends: any[];
  profilePicture: string;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
}

export interface FriendRequest {
  _id: string;
  from: User;
  to: User;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await fetch(`${apiUrl}/user`);
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  getUserById: async (id: string): Promise<User> => {
    try {
      const response = await fetch(`${apiUrl}/user/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },



  sendFriendRequest: async (toUserId: string): Promise<void> => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const toUser = await userService.getUserById(toUserId);

    console.log('Request payload:', {
      from: userData,
      to: toUser,
    });

    try {
      const response = await fetch(`${apiUrl}/friend-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: userData,
          to: toUser
        }),
      });

      const responseData = await response.json();

      console.log("responseData: ", responseData);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send friend request');
      }

      return responseData;
    } catch (error) {
      console.error('Error sending friend request:', error);
      throw error;
    }
  },

  getPendingFriendRequests: async (userId: string): Promise<FriendRequest[]> => {
    try {
      const response = await fetch(`${apiUrl}/friend-request/pending/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("getPendingFriendRequests: ", data);
      return data;
    } catch (error) {
      console.error('Error fetching pending friend requests:', error);
      throw error;
    }
  },

  acceptFriendRequest: async (requestId: string): Promise<void> => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const response = await fetch(`${apiUrl}/friend-request/${requestId}/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Accept friend request response:', data);

      const updatedUser = await userService.getUserById(user._id);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      return data;
    } catch (error) {
      console.error('Error accepting friend request:', error);
      throw error;
    }
  },

  rejectFriendRequest: async (requestId: string): Promise<void> => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const response = await fetch(`${apiUrl}/friend-request/${requestId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id }),

      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Accept friend request response:', data);
      return data;
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      throw error;
    }
  },

  getUserFriends: async (userId: string): Promise<User[]> => {
    try {
      const user = await userService.getUserById(userId);
      console.log("getUserFriends user: ", user);

      if (!user.friends || user.friends.length === 0) {
        console.log('No friends found for user');
        return [];
      }

      const friendPromises = user.friends.map(friendId =>
        userService.getUserById(friendId.toString())
      );

      const friends = await Promise.all(friendPromises);
      console.log('Fetched friends:', friends);
      return friends;
    } catch (error) {
      console.error('Error fetching user friends:', error);
      throw error;
    }
  },

  updateUser: async (userId: string, userData: Partial<User>): Promise<User> => {
    try {
      const response = await fetch(`${apiUrl}/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUser = await response.json();

      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  deleteUser: async (userId: string): Promise<void> => {
    try {
      const response = await fetch(`${apiUrl}/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete user');
      }

      localStorage.clear();

    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  uploadProfilePicture: async (userId: string, file: File): Promise<User> => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await fetch(`${apiUrl}/user/${userId}/profile-picture`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUser = await response.json();
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      throw error;
    }
  },

  updateStatus: async (userId: string, status: UserStatus): Promise<User> => {
    try {
      const response = await fetch(`${apiUrl}/user/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUser = await response.json();
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  },

};