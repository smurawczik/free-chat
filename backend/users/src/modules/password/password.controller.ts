import { Body, Controller, Post } from '@nestjs/common';
import { HashPasswordDto } from './dto/create-password.dto';
import { PasswordService } from './password.service';
import { ComparePasswordDto } from './dto/compare-password.dto';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('hash')
  hash(@Body() hashPasswordDto: HashPasswordDto) {
    return this.passwordService.hash(hashPasswordDto.password);
  }

  @Post('compare')
  compare(@Body() comparePasswordDto: ComparePasswordDto) {
    return this.passwordService.compare(
      comparePasswordDto.hashed_password,
      comparePasswordDto.compare_password,
    );
  }
}
