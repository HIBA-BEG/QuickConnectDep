import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
import { LoginDto } from './dto/login.dto';
import { FastifyRequest } from 'fastify';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('/register')
  async createUser(
    @Body()
    user: CreateUserDto,
  ): Promise<User> {
    return this.userService.create(user);
  }

  @Post('/login')
  async login(
    @Body()
    loginDto: LoginDto,
  ): Promise<User> {
    return this.userService.login(loginDto);
  }


  @Post('/logout')
  async logout(
    @Body('userId') userId: string,
  ): Promise<{ message: string }> {
    try {
      await this.userService.logout(userId);
      return { message: 'Logged out successfully' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Logout failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/friends')
  async getFriends(
    @Param('id')
    id: string,
  ): Promise<User[]> {
    try {
      return await this.userService.getFriends(id);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch friends',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getUser(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.userService.findById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id')
    id: string,
    @Body()
    user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateById(id, user);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.userService.deleteById(id);
  }

  @Post(':id/profile-picture')
  async uploadProfilePicture(
    @Param('id') id: string,
    @Req() request: FastifyRequest
  ) {
    try {
      const file = await request.file();
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }
  
      const buffer = await file.toBuffer();
      const fileData = {
        originalname: file.filename,
        mimetype: file.mimetype,
        buffer: buffer,
        size: buffer.length
      };
  
      return this.userService.updateProfilePicture(id, fileData);
    } catch (error) {
      throw new HttpException(
        'Failed to upload profile picture',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto
  ): Promise<User> {
    try {
      return await this.userService.updateStatus(id, updateStatusDto.status);
    } catch (error) {
      throw new HttpException(
        'Failed to update status',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  
}
