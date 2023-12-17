import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PeopleService {
  constructor(private readonly httpService: HttpService) {}

  async searchContacts(query: string, userId: string) {
    const { data: users } = await this.httpService.axiosRef.post<User>(
      '/people/search',
      {
        query,
        userId,
      },
    );

    return users;
  }
}
