import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 3,
      baseURL: 'http://users:3001',
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
