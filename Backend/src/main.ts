import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(4000); // Ensure this matches your fetch request
}
bootstrap();
