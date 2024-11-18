import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { Invitation, RequestStatus } from './entities/invitation.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Channel } from 'src/channel/entities/channel.entity';
import { WebsocketService } from 'src/websocket/websocket.service';

@Injectable()
export class InvitationService {
  constructor(
    @InjectModel(Invitation.name)
    private invitationModel: Model<Invitation>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Channel.name)
    private channelModel: Model<Channel>,
    private websocketService: WebsocketService,

  ) { }

  async create(createInvitationDto: CreateInvitationDto): Promise<Invitation> {

    const existingRequest = await this.invitationModel.findOne({
      from: createInvitationDto.from,
      to: createInvitationDto.to,
      channel: createInvitationDto.channel,
      status: RequestStatus.PENDING
    });

    if (existingRequest) {
      throw new HttpException(
        'Invitation already exists',
        HttpStatus.BAD_REQUEST
      );
    }

    const newRequest = new this.invitationModel({
      ...createInvitationDto,
      status: RequestStatus.PENDING,
    });

    const savedRequest = await newRequest.save();
    
     this.websocketService.sendInvitation(
      savedRequest.to._id.toString(),
      savedRequest
  );

    return savedRequest;
  }

  async findAll(): Promise<Invitation[]> {
    return this.invitationModel.find().populate('from to channel');
  }

  async findPendingInvitations(userId: string): Promise<Invitation[]> {
    return this.invitationModel.find({
      'to._id': userId,
    }).populate('from to channel');
  }

  async updateStatus(id: string, status: RequestStatus): Promise<Invitation> {
    try {
      
      const invitation = await this.invitationModel.findById(id).populate('from to channel');
      
      if (!invitation) {
        throw new NotFoundException('Invitation not found');
      }
  
    //   console.log('Invitation:', {
    //     invitationId: invitation._id,
    //     fromUserId: invitation.from._id,
    //     toUserId: invitation.to._id,
    //     currentStatus: invitation.status,
    //     channelId: invitation.channel._id,
    //   });
  
      
      if (status === RequestStatus.ACCEPTED) {
       
        const updatedChannel = await this.channelModel.findByIdAndUpdate(
          invitation.channel._id,
          { $addToSet: { members: invitation.to._id } }, 
          { new: true } 
        );
  
        console.log('Updated channel members:', updatedChannel?.members);
      }
  
      invitation.status = status;
      const updatedInvitation = await invitation.save();
  
      console.log('Invitation status updated to:', updatedInvitation.status);
  
      return updatedInvitation;
    } catch (error) {
      console.error('Error in updateStatus:', error);
      throw error;
    }
  }
  
}