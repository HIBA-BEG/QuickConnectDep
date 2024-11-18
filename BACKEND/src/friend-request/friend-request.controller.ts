import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { RequestStatus } from './entities/friend-request.entity';

@Controller('friend-request')
export class FriendRequestController {
  constructor(private readonly friendRequestService: FriendRequestService) { }

  @Post()
  async create(
    @Body()
    createFriendRequestDto: CreateFriendRequestDto
  ) {
    try {
      return await this.friendRequestService.create(createFriendRequestDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create friend request',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.friendRequestService.findAll();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch friend requests',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('pending/:userId')
  async findPendingRequests(@Param('userId') userId: string) {
    try {
      return await this.friendRequestService.findPendingRequests(userId);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch pending requests',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':id/accept')
  async acceptRequest(@Param('id') id: string) {
    try {
      return await this.friendRequestService.updateStatus(id, RequestStatus.ACCEPTED);
    } catch (error) {
      throw new HttpException(
        'Failed to accept friend request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':id/reject')
  async rejectRequest(@Param('id') id: string) {
    try {
      return await this.friendRequestService.updateStatus(id, RequestStatus.REJECTED);
    } catch (error) {
      throw new HttpException(
        'Failed to reject friend request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
