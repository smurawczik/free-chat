import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto) {
    const newContact = this.contactRepository.create({
      contact: {
        id: createContactDto.contactId,
      },
      status: 'pending',
      user: {
        id: createContactDto.userId,
      },
    });

    return this.contactRepository.save(newContact);
  }

  async findUserContacts(userId: string) {
    const userContacts = await this.contactRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      select: {
        id: false,
        contact: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          lastConnection: true,
        },
        status: true,
      },
      relations: {
        contact: true,
      },
    });

    return userContacts;
  }

  findAll() {
    return `This action returns all contact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    console.log(updateContactDto);

    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
