import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: 5000,
        maxRedirects: 3,
        baseURL: `http://${configService.get<string>(
          'USER_SERVICE_HOST',
        )}:3001`,
        withCredentials: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ContactController],
  providers: [ContactService, JwtService],
})
export class ContactModule {}
