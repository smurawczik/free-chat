import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PasswordModule } from 'src/password/password.module';
import { PasswordService } from 'src/password/password.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PasswordModule],
  controllers: [UserController],
  providers: [UserService, PasswordService],
  exports: [TypeOrmModule],
})
export class UserModule {}
