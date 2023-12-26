import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './entities/user.entity';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserResponse> {
    return this.userService.create(createUserDto, response);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('me')
  findMe(@Request() req: any): Promise<UserResponse> {
    return this.userService.findMe(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get(':id/last-connection')
  findOneLastConnection(@Param('id') id: string) {
    return this.userService.findLastConnection(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/last-connection')
  updateOneLastConnection(
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
