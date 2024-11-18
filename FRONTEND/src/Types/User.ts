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
    status:string | UserStatus; 
    channels: any[];
    friends: any[];
    profilePicture: string;
    lastSeen: string;
    createdAt: string;
    updatedAt: string;
  }
  