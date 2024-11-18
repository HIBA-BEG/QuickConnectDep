import {Injectable, NotFoundException } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Channel } from './entities/channel.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';



@Injectable()
export class ChannelService {

  constructor(
    @InjectModel(Channel.name) private channelModel: Model<Channel>,
  ) { }

  // ======================findALL=======================

  async findAll(userId: string): Promise<Channel[]> {
    const allChannel = await this.channelModel
      .find({ moderator: userId })
      .populate('members')
      .populate('moderator')

    if (!allChannel) {
      throw new NotFoundException('no data available')
    }
    return allChannel
  }

  // ==============================create=====================

  async create(createChannelDto: CreateChannelDto): Promise<Channel> {

    const response = new this.channelModel({
      ...createChannelDto
    });

    const channel = await response.save()
    return channel;
  }

  // ==========================update===================
  async update(id: string, updateChannelDto: UpdateChannelDto): Promise<Channel> {
    
    const existingChannel = await this.channelModel.findById(id);
    

    const currentMembers = existingChannel.members || [];
    const newMembers = updateChannelDto.members || [];
    
    
    const updatedMembers = Array.from(new Set([...currentMembers, ...newMembers]));

   
    const channelUpdate = await this.channelModel.findByIdAndUpdate(
        id,
        { ...updateChannelDto, members: updatedMembers },
        { new: true, runValidators: true }
    );

    return channelUpdate;
}


  // ==================find by id=====================
  async findById(id: string): Promise<Channel> {
    const channel = (await this.channelModel
      .findById(id)
      .populate('members')
      .populate('moderator'));

    if (!channel) {
      throw new NotFoundException('channel not found.');
    }
    return channel;
  }
//   // ==========================delete ===================

  async delete(id: string): Promise<Channel> {
    return await this.channelModel.findByIdAndDelete(id);
  }
}
