import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { noop } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

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

    await this.authService.jwtSignUser(
      createUserDto.email,
      createUserDto.password,
      response,
    );

    return user;
  }

  async findMe(userId: string) {
    const { data } = await this.httpService.axiosRef.post<User>('/user/me', {
      userId,
    });

    if (!data) {
      throw new HttpException('Error', 404);
    }

    const { password, ...user } = data;
    noop.apply(this, [password]);

    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    return this.httpService.axiosRef.get<User>(`/user/${id}`);
  }

  async findLastConnection(id: string) {
    const userLastConnectionResponse = await this.httpService.axiosRef.get<{
      lastConnection?: string | null;
    }>(`/user/${id}/last-connection`);

    if (!userLastConnectionResponse.data) {
      throw new HttpException('Error', 404);
    }

    return userLastConnectionResponse.data;
  }

  async updateLastConnection(id: string, lastConnection: string) {
    const userLastConnectionResponse = await this.httpService.axiosRef.post<{
      lastConnection?: string | null;
    }>(`/user/${id}/last-connection`, {
      lastConnection,
    });

    if (!userLastConnectionResponse.data) {
      throw new HttpException('Error', 404);
    }

    return userLastConnectionResponse.data;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);

    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
