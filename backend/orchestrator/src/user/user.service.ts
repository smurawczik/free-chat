import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  create(createUserDto: CreateUserDto) {
    return firstValueFrom(
      this.client.send<User, CreateUserDto>('createUser', createUserDto),
    );
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);

    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
