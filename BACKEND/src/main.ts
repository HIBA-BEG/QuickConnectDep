import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter,NestFastifyApplication} from '@nestjs/platform-fastify';
import fastifyMultipart from '@fastify/multipart';
import { IoAdapter } from '@nestjs/platform-socket.io';


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.enableCors({
    origin: [
      'http://localhost:3000', 
      'https://quick-connect-dep.vercel.app',
      process.env.FRONTEND_URL,
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  
  await (app as any).register(fastifyMultipart, {
    limits: {
      fileSize: 5 * 1024 * 1024 // 5MB
    }
  });

  app.useWebSocketAdapter(new IoAdapter(app));
 
  const port = process.env.PORT || 3001;
  
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Application is running on port ${port}`);
  });
}
bootstrap();
