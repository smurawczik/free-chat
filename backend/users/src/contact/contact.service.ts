import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  create(createContactDto: CreateContactDto) {
    console.log(createContactDto);

    return 'This action adds a new contact';
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
        },
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
