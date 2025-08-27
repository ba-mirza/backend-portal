import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as process from 'node:process';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = ['http://localhost:5173'];
  if (process.env.NODE_ENV === 'production') {
    allowedOrigins.push('vercel.app');
  }

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  });
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableShutdownHooks();

  const PORT = process.env.PORT || 3002;

  await app.listen(PORT, '0.0.0.0');

  logger.log(`🚀 Server running on port ${PORT}`);
  logger.log(`📖 API available at: http://localhost:${PORT}/api`);
}

bootstrap();
