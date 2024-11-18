import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ConversationsService } from './coversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  async createConversation(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationsService.createConversation(createConversationDto);
  }

  @Get(':senderId/:receiverId')
  async getConversation(@Param('senderId') senderId: string, @Param('receiverId') receiverId: string) {
    return this.conversationsService.getConversation(senderId, receiverId);
  }
}

