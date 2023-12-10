import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/user.dto';

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

    console.log('user', user);
    console.log('hashedPassword', matchedPassword);

    if (!matchedPassword) {
      throw new UnauthorizedException();
    }

    const date = new Date();
    date.setDate(date.getDate() + 7);

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
      expiration_date: date,
    };
  }
}
