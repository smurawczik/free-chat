import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactService } from 'src/modules/contact/contact.service';
import { User } from 'src/modules/user/entities/user.entity';
import { Like, Not, Repository } from 'typeorm';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly contactService: ContactService,
  ) {}

  async searchContacts(query: string, userId: string) {
    const likeCondition = Like(`%${query}%`);
    const notUserIdCondition = Not(userId);

    const userContactIds = (
      await this.contactService.findUserContacts(userId)
    ).map((contact) => contact.contact.id);

    const contacts = await this.userRepository.find({
      where: [
        {
          email: likeCondition,
          id: notUserIdCondition,
        },
        {
          firstName: likeCondition,
          id: notUserIdCondition,
        },
        {
          lastName: likeCondition,
          id: notUserIdCondition,
        },
      ],
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        lastConnection: true,
      },
    });

    return contacts.filter((contact) => !userContactIds.includes(contact.id));
  }
}
