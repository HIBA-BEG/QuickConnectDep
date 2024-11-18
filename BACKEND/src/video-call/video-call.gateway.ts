import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class VideoCallGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join-room')
  handleJoinRoom(@MessageBody() roomId: string, @ConnectedSocket() client: Socket) {
    client.join(roomId);
    client.broadcast.to(roomId).emit('user-connected', client.id);
  }

  @SubscribeMessage('call-user')
  handleCallUser(
    @MessageBody() data: { from: string; to: string; signalData: any },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(data.to).emit('incoming-call', { from: data.from, signal: data.signalData });
  }

  @SubscribeMessage('answer-call')
  handleAnswerCall(
    @MessageBody() data: { to: string; signalData: any },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(data.to).emit('call-answered', { signal: data.signalData });
  }
}
