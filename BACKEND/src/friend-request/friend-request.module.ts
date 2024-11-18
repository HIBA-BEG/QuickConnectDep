import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestController } from './friend-request.controller';
import { FriendRequest, FriendRequestSchema } from './entities/friend-request.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { WebsocketModule } from 'src/websocket/websocket.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: FriendRequest.name, schema: FriendRequestSchema },
            { name: User.name, schema: UserSchema },
        ]),
        WebsocketModule,
    ],
    controllers: [FriendRequestController],
    providers: [FriendRequestService],
    exports: [FriendRequestService],
})
export class FriendRequestModule {}
