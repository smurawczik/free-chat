import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ContactService } from './contact.service';
import { Request } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.contactService.findAllUserContacts(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Post('add')
  addContact(@Request() req: any, @Body() createContactDto: CreateContactDto) {
    return this.contactService.addNewContact(
      req.user.id,
      createContactDto.contactId,
    );
  }

  @UseGuards(AuthGuard)
  @Post('accept')
  acceptContact(
    @Request() req: any,
    @Body() createContactDto: CreateContactDto,
  ) {
    return this.contactService.acceptRejectNewContact(
      req.user.id,
      createContactDto.contactId,
      'accepted',
    );
  }

  @UseGuards(AuthGuard)
  @Post('reject')
  rejectContact(
    @Request() req: any,
    @Body() createContactDto: CreateContactDto,
  ) {
    return this.contactService.acceptRejectNewContact(
      req.user.id,
      createContactDto.contactId,
      'rejected',
    );
  }
}
