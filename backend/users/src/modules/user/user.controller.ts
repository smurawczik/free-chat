import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post('me')
  findMe(@Body() { userId }: { userId: string }) {
    return this.userService.findMe(userId);
  }

  @Post('find')
  find(@Body() { email, password }: { email: string; password: string }) {
    return this.userService.find(email, password);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get(':id/last-connection')
  findLastConnection(@Param('id') id: string) {
    return this.userService.findLastConnection(id);
  }

  @Post(':id/last-connection')
  updateLastConnection(
    @Param('id') id: string,
    @Body() { lastConnection }: { lastConnection: string },
  ) {
    return this.userService.updateLastConnection(id, lastConnection);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
