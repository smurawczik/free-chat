import { Body, Controller, Post } from '@nestjs/common';
import { SearchPersonDto } from './dto/search-person.dto';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post('search')
  searchPeople(@Body() searchPersonDto: SearchPersonDto) {
    return this.peopleService.searchContacts(
      searchPersonDto.query,
      searchPersonDto.userId,
    );
  }
}
