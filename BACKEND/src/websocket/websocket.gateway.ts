import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { WebsocketService } from './websocket.service';
import { CreateWebsocketDto } from './dto/create-websocket.dto';
import { UpdateWebsocketDto } from './dto/update-websocket.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    }
})

export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(private readonly websocketService: WebsocketService) { }

    afterInit() {
        this.websocketService.setServer(this.server);
    }

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
        this.websocketService.remove(client.id);
    }

    @SubscribeMessage('register')
    create(
        @MessageBody() userId: string,
        @ConnectedSocket() client: Socket,
    ) {
        const dto: CreateWebsocketDto = {
            userId,
            socketId: client.id
        };
        return this.websocketService.create(dto);
    }

    @SubscribeMessage('friendRequest')
    handleFriendRequest(
        @MessageBody() data: { toUserId: string; request: any }
    ) {
        return this.websocketService.sendFriendRequest(data.toUserId, data.request);
    }
    @SubscribeMessage('invitation')
    handleInvitation(
        @MessageBody() data: { toUserId: string; invitation: any }
    ) {
        return this.websocketService.sendInvitation(data.toUserId, data.invitation);
    }

    @SubscribeMessage('findAllWebsocket')
    findAll() {
        return this.websocketService.findAll();
    }

    @SubscribeMessage('findOneWebsocket')
    findOne(@MessageBody() socketId: string) {
        return this.websocketService.findOne(socketId);
    }

    //   @SubscribeMessage('updateWebsocket')
    //   update(@MessageBody() updateWebsocketDto: UpdateWebsocketDto) {
    //     return this.websocketService.update(updateWebsocketDto.id, updateWebsocketDto);
    //   }

    @SubscribeMessage('removeWebsocket')
    remove(@MessageBody() socketId: string) {
        return this.websocketService.remove(socketId);
    }
}
