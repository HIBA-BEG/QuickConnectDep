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
  //     console.log('Starting profile picture upload for user:', userId);

  //     // Convert buffer to base64
  //     const b64 = Buffer.from(file.buffer).toString('base64');
  //     const dataURI = `data:${file.mimetype};base64,${b64}`;

  //     console.log('File details:', {
  //       mimetype: file.mimetype,
  //       size: file.size,
  //       originalname: file.originalname
  //     });


  //     // Upload to Cloudinary with error handling
  //     const uploadResult = await new Promise((resolve, reject) => {
  //       cloudinary.uploader.upload(dataURI, {
  //         folder: 'quickconnect-profilepic',
  //         public_id: `user-${userId}`,
  //         overwrite: true,
  //         resource_type: 'auto'
  //       }, (error, result) => {
  //         if (error) reject(error);
  //         else resolve(result);
  //       });
  //     });

  //     // Update user profile with new image URL
  //     const updatedUser = await this.userModel.findByIdAndUpdate(
  //       userId,
  //       { profilePicture: uploadResult.secure_url },
  //       { new: true }
  //     );

  //     if (!updatedUser) {
  //       throw new NotFoundException('User not found');
  //     }

  //     return updatedUser;
  //   } catch (error) {
  //     console.error('Profile picture upload error:', error);
  //     throw new Error(`Failed to upload profile picture: ${error.message}`);
  //   }
  // }

  async updateProfilePicture(userId: string, file: any) {
    try {
      console.log('Starting profile picture upload for user:', userId);
      
      if (!file || !file.buffer) {
        throw new Error('Invalid file data');
      }
  
      // console.log('File details:', {
      //   mimetype: file.mimetype,
      //   size: file.buffer.length,
      //   originalname: file.originalname
      // });
  
      const b64 = Buffer.from(file.buffer).toString('base64');
      const dataURI = `data:${file.mimetype};base64,${b64}`;
  
      console.log('Cloudinary config:', {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Not set',
        apiKey: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not set',
        apiSecret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set'
      });
  
      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(dataURI, {
          folder: 'quickconnect-profilepic',
          public_id: `user-${userId}`,
          overwrite: true,
          resource_type: 'auto',
          timeout: 60000
        }, (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('Cloudinary upload success:', {
              url: result.secure_url,
              publicId: result.public_id
            });
            resolve(result);
          }
        });
      });
  
      if (!uploadResult || !uploadResult.secure_url) {
        throw new Error('Invalid upload result from Cloudinary');
      }
  
      console.log('Updating user profile with new image URL:', uploadResult.secure_url);
      
      const updatedUser = await this.userModel.findByIdAndUpdate(
        userId,
        { 
          profilePicture: uploadResult.secure_url,
          updatedAt: new Date()
        },
        { 
          new: true,
          runValidators: true 
        }
      );
  
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
  
      console.log('Profile picture update completed successfully');
      return updatedUser;
  
    } catch (error) {
      console.error('Detailed upload error:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code
      });
  
      if (error instanceof NotFoundException) {
        throw error;
      }
      
      if (error.message.includes('User not found')) {
        throw new NotFoundException(error.message);
      }
  
      throw new Error(`Failed to upload profile picture: ${error.message}`);
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
