import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { noop } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

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

    await this.signInUser(
      createUserDto.email,
      createUserDto.password,
      response,
    );

    return user;
  }

  async login(
    loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { data } = await this.httpService.axiosRef.post<User>('/user/login', {
      email: loginUserDto.email,
      password: loginUserDto.password,
    });

    if (!data) {
      throw new HttpException('Error', 404);
    }

    const { password, ...user } = data;
    noop.apply(this, [password]);

    await this.signInUser(loginUserDto.email, loginUserDto.password, response);

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

  private async signInUser(
    email: string,
    password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const auth = await this.authService.signIn(email, password);

    response.cookie('access-token', auth.access_token, {
      httpOnly: true,
      expires: auth.expiration_date,
    });
  }
}
