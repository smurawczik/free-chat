import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const gatewayApiURL = configService.get<string>('GATEWAY_API_URL');
  const serverPort = configService.get<number>('PORT');

  if (!serverPort || !gatewayApiURL) {
    throw new Error('Missing environment variables');
  }

  app.enableCors({
    origin: new RegExp(`${gatewayApiURL}`),
    credentials: true,
  });
  app.use(cookieParser());
  app.use(compression());
  await app.listen(serverPort, () =>
    console.log(`users is listening on port ${serverPort}`),
  );
}

bootstrap();
