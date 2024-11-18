import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { FriendRequest, RequestStatus } from './entities/friend-request.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { WebsocketService } from 'src/websocket/websocket.service';

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectModel(FriendRequest.name)
    private friendRequestModel: Model<FriendRequest>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    private websocketService: WebsocketService,

  ) { }

  async create(createFriendRequestDto: CreateFriendRequestDto): Promise<FriendRequest> {

    const existingRequest = await this.friendRequestModel.findOne({
      from: createFriendRequestDto.from,
      to: createFriendRequestDto.to,
      status: RequestStatus.PENDING
    });

    if (existingRequest) {
      throw new HttpException(
        'Friend request already exists',
        HttpStatus.BAD_REQUEST
      );
    }

    const newRequest = new this.friendRequestModel({
      ...createFriendRequestDto,
      status: RequestStatus.PENDING,
    });

    const savedRequest = await newRequest.save();
    
    this.websocketService.sendFriendRequest(
      savedRequest.to._id.toString(),
      savedRequest
    );

    return savedRequest;
  }

  async findAll(): Promise<FriendRequest[]> {
    return this.friendRequestModel.find().populate('from to');
  }

  async findPendingRequests(userId: string): Promise<FriendRequest[]> {
    return this.friendRequestModel.find({
      'to._id': userId,
      status: RequestStatus.PENDING,
    }).populate('from to');
  }

  async updateStatus(id: string, status: RequestStatus): Promise<FriendRequest> {
    try {
      const request = await this.friendRequestModel.findById(id).populate('from to');
      
      if (!request) {
        throw new NotFoundException('Friend request not found');
      }
  
      // console.log('friend request:', {
      //   requestId: request._id,
      //   fromUserId: request.from._id,
      //   toUserId: request.to._id,
      //   currentStatus: request.status
      // });
  
      if (status === RequestStatus.ACCEPTED) {  
        const fromUserUpdate = await this.userModel.findByIdAndUpdate(
          request.from._id,
          { $addToSet: { friends: request.to._id.toString() } },
          { new: true }
        );
        console.log('Updated from user friends:', fromUserUpdate?.friends);
  
        const toUserUpdate = await this.userModel.findByIdAndUpdate(
          request.to._id,
          { $addToSet: { friends: request.from._id.toString() } },
          { new: true }
        );
        console.log('Updated to user friends:', toUserUpdate?.friends);
      }
  
      request.status = status;
      const updatedRequest = await request.save();
      console.log('Friend request status updated to:', updatedRequest.status);
  
      return updatedRequest;
    } catch (error) {
      console.error('Error in updateStatus:', error);
      throw error;
    }
  }
}