import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ContactService } from './contact.service';
import { Request } from '@nestjs/common';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.contactService.findAllUserContacts(req.user.id);
  }
}
