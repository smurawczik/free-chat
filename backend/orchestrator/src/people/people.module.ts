import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: 5000,
        maxRedirects: 3,
        baseURL: `${configService.get<string>('USERS_API_URL')}`,
        withCredentials: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [PeopleController],
  providers: [PeopleService, AuthService, JwtService],
})
export class PeopleModule {}
