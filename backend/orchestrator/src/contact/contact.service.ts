import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ContactResponse } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(private readonly httpService: HttpService) {}

  async findAllUserContacts(userId: string) {
    if (!userId) {
      return [];
    }

    const { data: userContacts } = await this.httpService.axiosRef.post<
      ContactResponse[]
    >('/contact', { userId });

    return userContacts.map((userContact) => ({
      ...userContact.contact,
      status: userContact.status,
    }));
  }
}
