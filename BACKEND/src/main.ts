import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter,NestFastifyApplication} from '@nestjs/platform-fastify';
import fastifyMultipart from '@fastify/multipart';
import fastifyCors from '@fastify/cors';


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.enableCors({
    origin: [
      'https://quick-connect-dep.vercel.app',
      'http://localhost:3000'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
  });

  
  await (app as any).register(fastifyMultipart, {
    limits: {
      fileSize: 5 * 1024 * 1024 // 5MB
    }
  });

 
  const port = process.env.PORT || 3001;
  
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Application is running on port ${port}`);
  });
}
bootstrap();
