import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  if (process.env.NODE_ENV === 'development') {
    const server = app.getHttpServer();
    const router = server._events.request._router;

    console.log('Registered routes:');
    router.stack.forEach((middleware) => {
      if (middleware.route) {
        console.log(
          `${Object.keys(middleware.route.methods)} ${middleware.route.path}`,
        );
      }
    });
  }

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
