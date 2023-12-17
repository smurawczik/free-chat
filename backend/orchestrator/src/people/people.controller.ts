import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SearchPersonDto } from './dto/search-person.dto';
import { PeopleService } from './people.service';
import { Request } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @UseGuards(AuthGuard)
  @Post('search')
  searchPeople(@Request() req: any, @Body() searchPersonDto: SearchPersonDto) {
    return this.peopleService.searchContacts(
      searchPersonDto.query,
      req.user.id,
    );
  }
}
