import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
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

    const answeringContact = this.contactRepository.create({
      contact: {
        id: createContactDto.userId,
      },
      status: 'answer',
      user: {
        id: createContactDto.contactId,
      },
    });

    return this.contactRepository.save([newContact, answeringContact]);
  }

  async accept(createContactDto: CreateContactDto) {
    const newContact = await this.contactRepository.findOne({
      where: {
        contact: {
          id: createContactDto.contactId,
        },
        user: {
          id: createContactDto.userId,
        },
        status: 'answer',
      },
    });

    const answeringContact = await this.contactRepository.findOne({
      where: {
        contact: {
          id: createContactDto.userId,
        },
        status: 'pending',
        user: {
          id: createContactDto.contactId,
        },
      },
    });

    const updatedNewContact = { ...newContact, status: 'accepted' };
    const updatedAnsweringContact = { ...answeringContact, status: 'accepted' };
    await this.contactRepository.save([
      updatedNewContact,
      updatedAnsweringContact,
    ]);

    return updatedNewContact;
  }

  async reject(createContactDto: CreateContactDto) {
    const newContact = await this.contactRepository.findOne({
      where: {
        contact: {
          id: createContactDto.contactId,
        },
        user: {
          id: createContactDto.userId,
        },
        status: 'answer',
      },
    });

    const answeringContact = await this.contactRepository.findOne({
      where: {
        contact: {
          id: createContactDto.userId,
        },
        status: 'pending',
        user: {
          id: createContactDto.contactId,
        },
      },
    });

    const updatedNewContact = { ...newContact, status: 'rejected' };
    const updatedAnsweringContact = { ...answeringContact, status: 'rejected' };
    await this.contactRepository.save([
      updatedNewContact,
      updatedAnsweringContact,
    ]);

    return updatedNewContact;
  }

  async findUserContacts(userId: string) {
    const userContacts = await this.contactRepository.find({
      where: {
        user: {
          id: userId,
        },
        status: Not('rejected'),
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
