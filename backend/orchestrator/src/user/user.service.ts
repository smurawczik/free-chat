import { HttpService } from '@nestjs/axios';
import { Injectable, Req, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}

  async create(
    createUserDto: CreateUserDto,
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    // try {
    const { data, headers } = await this.httpService.axiosRef.post(
      '/user',
      createUserDto,
    );
    console.log('data', data);
    // console.log('config', config);
    console.log('headers', headers);
    console.log('RESPONSE HEADERS', response.getHeaders());

    const date = new Date();
    date.setDate(date.getDate() + 7);
    response.cookie('access-token', headers.authorization, {
      httpOnly: true,
      expires: date,
    });

    return data;
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
