import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChannelModule } from './channel/channel.module';
import { MessageModule } from './message/message.module';
import { NotificationModule } from './notification/notification.module';
import { FriendRequestModule } from './friend-request/friend-request.module';
import { BanListModule } from './ban-list/ban-list.module';
import { RatingModule } from './rating/rating.module';
import { RewardModule } from './reward/reward.module';
import { VideoCallGateway } from './video-call/video-call.gateway';
import { ConversationsModule } from './conversation/conversation.module';
import { ChatGateway } from './socket/socket.gateway';
import { WebsocketModule } from './websocket/websocket.module';
import { InvitationModule } from './invitation/invitation.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    ChannelModule,
    MessageModule,
    NotificationModule,
    FriendRequestModule,
    BanListModule,
    RatingModule,
    RewardModule,
    ConversationsModule,
    WebsocketModule,
    InvitationModule
  ],
  controllers: [AppController],
  providers: [AppService,VideoCallGateway,ChatGateway],
})
export class AppModule {}
