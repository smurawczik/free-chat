import { HttpService } from '@nestjs/axios';
import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { noop } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private authService: AuthService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { data } = await this.httpService.axiosRef.post<User>(
      '/user',
      createUserDto,
    );

    const { password, ...user } = data;
    noop.apply(this, [password]);

    const auth = await this.authService.signIn(
      createUserDto.email,
      createUserDto.password,
    );

    response.cookie('access-token', auth.access_token, {
      httpOnly: true,
      expires: auth.expiration_date,
    });

    return user;
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
