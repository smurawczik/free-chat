import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { User } from 'src/modules/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactService } from 'src/modules/contact/contact.service';
import { Contact } from 'src/modules/contact/entities/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Contact])],
  controllers: [PeopleController],
  providers: [PeopleService, ContactService],
  exports: [TypeOrmModule],
})
export class PeopleModule {}
