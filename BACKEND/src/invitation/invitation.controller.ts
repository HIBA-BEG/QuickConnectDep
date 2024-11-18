import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, ValidationPipe, Put } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { RequestStatus } from './entities/invitation.entity';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) { }

  @Post()
  async create(
    @Body()
    createInvitationDto: CreateInvitationDto
  ) {
    try {
      return await this.invitationService.create(createInvitationDto);
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
      return await this.invitationService.findAll();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch invitation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('pending/:userId')
  async findPendingInvitations(@Param('userId') userId: string) {
    try {
      return await this.invitationService.findPendingInvitations(userId);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch pending invitation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id/accept')
  async acceptInvitation(@Param('id') id: string) {
    try {
      return await this.invitationService.updateStatus(id, RequestStatus.ACCEPTED);
    } catch (error) {
      throw new HttpException(
        'Failed to accept invitation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id/reject')
  async rejectInvitation(@Param('id') id: string) {
    try {
      return await this.invitationService.updateStatus(id, RequestStatus.REJECTED);
    } catch (error) {
      throw new HttpException(
        'Failed to reject invitation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
