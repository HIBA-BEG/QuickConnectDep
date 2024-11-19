import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserStatus } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { LoginDto } from './dto/login.dto';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    if (!users) {
      throw new NotFoundException('Users not found.');
    }
    return users;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    const res = await this.userModel.create({
      ...createUserDto,
      status: UserStatus.ONLINE,
      lastSeen: new Date(),
    });
    const user = await res.save();
    return user;
  }

  async login(loginDto: LoginDto): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { email: loginDto.email },
      {
        status: UserStatus.ONLINE,
        lastSeen: new Date(),
      },
      { new: true },
    );
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async logout(userId: string): Promise<void> {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found.');
      }

      await this.userModel.findByIdAndUpdate(userId, {
        status: UserStatus.OFFLINE,
        lastSeen: new Date(),
      });
    } catch (error) {
      throw new Error(`Logout failed: ${error.message}`);
    }
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async updateById(id: string, user: UpdateUserDto): Promise<User> {
    const oneUser = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
    if (!oneUser) {
      throw new NotFoundException('User not found.');
    }
    return oneUser;
  }

  async deleteById(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }


  async getFriends(userId: string): Promise<User[]> {
    const user = await this.userModel
      .findById(userId)
      .populate('friends', 'firstName lastName username')
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.friends;
  }

  // async updateProfilePicture(userId: string, file: any) {
  //   try {
  //     const filename = `${userId}-${Date.now()}.${file.originalname.split('.').pop()}`;
  
  //     await this.minioClient.client.putObject(
  //       'quickconnect-profilepic',
  //       filename,
  //       file.buffer,
  //       file.size,
  //       { 'Content-Type': file.mimetype }
  //     );
  
  //     const imageUrl = await this.minioClient.client.presignedGetObject(
  //       'quickconnect-profilepic',
  //       filename
  //     );
  
  //     return this.userModel.findByIdAndUpdate(
  //       userId,
  //       { profilePicture: imageUrl },
  //       { new: true }
  //     );
  //   } catch (error) {
  //     throw new Error('Failed to upload profile picture');
  //   }
  // }

  async updateProfilePicture(userId: string, file: any) {
    try {
      return new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          {
            folder: 'quickconnect-profilepic',
            public_id: `user-${userId}`,
            overwrite: true,
            resource_type: 'auto'
          },
          async (error, result) => {
            if (error) {
              console.error('Upload error:', error);
              reject(new Error('Failed to upload profile picture'));
              return;
            }

            try {
              const updatedUser = await this.userModel.findByIdAndUpdate(
                userId,
                { profilePicture: result.secure_url },
                { new: true }
              );
              resolve(updatedUser);
            } catch (dbError) {
              reject(dbError);
            }
          }
        );

        // Create a stream from the file buffer and pipe it to Cloudinary
        const stream = Readable.from(file.buffer);
        stream.pipe(upload);
      });
    } catch (error) {
      console.error('Profile picture upload error:', error);
      throw new Error('Failed to upload profile picture');
    }
  }

  async updateStatus(userId: string, status: UserStatus): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndUpdate(
        userId,
        { 
          status,
          lastSeen: new Date()
        },
        { new: true }
      );

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new Error('Failed to update status');
    }
  }
}
