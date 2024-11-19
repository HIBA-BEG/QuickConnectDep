// import { MinioModule } from 'nestjs-minio-client';

// export const minioConfig = {
//     endPoint: 'localhost',
//     port: 9000,
//     useSSL: false, 
//     accessKey: 'minioadmin',
//     secretKey: 'minioadmin',
//     bucket: 'quickconnect-profilepic'
// };

import { ConfigModule, ConfigService } from '@nestjs/config';

export const minioConfig = {
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT) || 9000,
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
};

export const MinioConfigAsync = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    endPoint: configService.get('MINIO_ENDPOINT'),
    port: parseInt(configService.get('MINIO_PORT')),
    useSSL: configService.get('MINIO_USE_SSL') === 'true',
    accessKey: configService.get('MINIO_ACCESS_KEY'),
    secretKey: configService.get('MINIO_SECRET_KEY'),
  }),
  inject: [ConfigService],
};