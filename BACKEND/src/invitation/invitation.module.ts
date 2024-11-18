import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { Invitation, InvitationSchema } from './entities/invitation.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { Channel, ChannelSchema } from 'src/channel/entities/channel.entity';
import { WebsocketModule } from 'src/websocket/websocket.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Invitation.name, schema: InvitationSchema },
            { name: User.name, schema: UserSchema },
            { name: Channel.name, schema: ChannelSchema },
        ]),
        WebsocketModule,
    ],
    controllers: [InvitationController],
    providers: [InvitationService],
    exports: [InvitationService],
})
export class InvitationModule {}
