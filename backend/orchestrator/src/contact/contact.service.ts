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

  async addNewContact(userId: string, contactId: string) {
    if (!userId || !contactId) {
      return [];
    }

    const { data: userContact } = await this.httpService.axiosRef.post<
      Pick<ContactResponse, 'id' | 'status'>
    >('/contact/add', {
      userId,
      contactId,
    });

    return userContact;
  }

  async acceptRejectNewContact(
    userId: string,
    contactId: string,
    status: string,
  ) {
    if (!userId || !contactId) {
      return [];
    }

    if (!['accepted', 'rejected'].includes(status)) {
      throw new Error('Invalid status');
    }

    const { data: userContact } = await this.httpService.axiosRef.post<
      Pick<ContactResponse, 'id' | 'status'>
    >(`/contact/${status === 'accepted' ? 'accept' : 'reject'}`, {
      userId,
      contactId,
    });

    return userContact;
  }
}
