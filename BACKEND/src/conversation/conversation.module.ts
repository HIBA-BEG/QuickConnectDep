import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationsController } from './conversation.controller';
import { ConversationsService } from './coversation.service';
import { Conversation, ConversationSchema } from './entities/conversation.entity';

@Module({
  imports: [
MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema }]),
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService],
})
export class ConversationsModule {}
