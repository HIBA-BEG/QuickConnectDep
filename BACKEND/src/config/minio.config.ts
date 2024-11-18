import { MinioModule } from 'nestjs-minio-client';

export const minioConfig = {
    endPoint: 'localhost',
    port: 9000,
    useSSL: false, 
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
    bucket: 'quickconnect-profilepic'
};