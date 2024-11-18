import { Injectable } from '@nestjs/common';
import { CreateWebsocketDto } from './dto/create-websocket.dto';
import { UpdateWebsocketDto } from './dto/update-websocket.dto';
import { Server } from 'socket.io';

@Injectable()
export class WebsocketService {
  private userSockets = new Map<string, string>();
  private server: Server;

  setServer(server: Server) {
    this.server = server;
    console.log('WebSocket server initialized');
  }
  create(createWebsocketDto: CreateWebsocketDto) {
    console.log('Registering socket for user:', createWebsocketDto.userId);
    this.userSockets.set(createWebsocketDto.userId, createWebsocketDto.socketId);
    console.log('Current active connections:', Array.from(this.userSockets.entries()));
    return 'Socket connection registered';
  }

  findAll() {
    return Array.from(this.userSockets.entries());
  }

  findOne(userId: string) {
    return this.userSockets.get(userId);
  }

  // update(id: number, updateWebsocketDto: UpdateWebsocketDto) {
  //   return `This action updates a #${id} websocket`;
  // }

  sendFriendRequest(toUserId: string, request: any) {
    console.log('Attempting to send friend request to user:', toUserId);
    const socketId = this.userSockets.get(toUserId);

    if (socketId && this.server) {
      console.log('Found socket, sending request to:', socketId);
      this.server.to(socketId).emit('friendRequest', request);
      return { sent: true, socketId };
    }

    console.log('No socket found for user:', toUserId);
    return { sent: false, socketId: null };
  }

  sendInvitation(toUserId: string, invitation: any) {
    console.log('Attempting to send invitation to user:', toUserId);
    const socketId = this.userSockets.get(toUserId);

    if (socketId && this.server) {
      console.log('Found socket, sending invitation to:', socketId);
      this.server.to(socketId).emit('invitation', invitation);
      return { sent: true, socketId };
    }

    console.log('No socket found for user:', toUserId);
    return { sent: false, socketId: null };
  }

  remove(socketId: string) {
    for (const [userId, sid] of this.userSockets.entries()) {
      if (sid === socketId) {
        this.userSockets.delete(userId);
        console.log(`Removed socket for user: ${userId}`);
        console.log('Remaining connections:', Array.from(this.userSockets.entries()));

        return `Socket removed for user ${userId}`;
      }
    }
  }
}
