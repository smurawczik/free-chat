import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}

  async create(createUserDto: CreateUserDto) {
    // try {
    const { data } = await this.httpService.axiosRef.post(
      '/user',
      createUserDto,
    );
    console.log('data', data);

    return data;
    // } catch (error) {
    //   console.log('error', error.response.data);
    //   throw new HttpException(error.response.data, error.response.status);
    // }
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
