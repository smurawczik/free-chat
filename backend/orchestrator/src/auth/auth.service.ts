import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  Injectable,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { noop } from 'rxjs';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(id: string, pass: string) {
    const { data: user } = await this.httpService.axiosRef.get<UserDto>(
      `/user/${id}`,
    );
    const { data: matchedPassword } =
      await this.httpService.axiosRef.post<string>('/password/compare', {
        hashed_password: user.password,
        compare_password: pass,
      });

    if (!matchedPassword) {
      throw new UnauthorizedException();
    }

    const date = new Date();
    date.setDate(date.getDate() + 7);

    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
      expiration_date: date,
    };
  }

  async login(
    loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { data } = await this.httpService.axiosRef.post<User>('/user/find', {
      email: loginUserDto.email,
      password: loginUserDto.password,
    });

    if (!data) {
      throw new HttpException('Error', 404);
    }

    const { password, ...user } = data;
    noop.apply(this, [password]);

    await this.jwtSignUser(user.id, loginUserDto.password, response);

    return user;
  }

  async jwtSignUser(
    id: string,
    password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const auth = await this.signIn(id, password);

    response.cookie('access-token', auth.access_token, {
      httpOnly: true,
      expires: auth.expiration_date,
    });
  }
}
