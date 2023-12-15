import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const CORS_ALLOWED_ORIGIN_HOST = await app
    .get(ConfigService)
    .get<string>('CORS_ALLOWED_ORIGIN_HOST');
  app.enableCors({
    origin: `http://${CORS_ALLOWED_ORIGIN_HOST}:3000`,
    credentials: true,
  });
  app.use(cookieParser());
  app.use(compression());
  await app.listen(3001, () => console.log('users is listening on port 3001'));
}

bootstrap();
