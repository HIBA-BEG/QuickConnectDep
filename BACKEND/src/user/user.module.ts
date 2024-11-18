import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { minioConfig } from 'src/config/minio.config';
import { MinioModule } from 'nestjs-minio-client';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), MinioModule.register({
    ...minioConfig
}),],
  controllers: [UserController],
  providers: [UserService],
  exports: [MongooseModule],
})
export class UserModule {}
