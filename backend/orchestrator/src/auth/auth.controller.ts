import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserResponse } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserResponse> {
    return this.authService.login(loginUserDto, response);
  }

  @Post('verify')
  verify(@Body() verifyUserDto: VerifyUserDto): Promise<UserResponse> {
    return this.authService.verifyUser(verifyUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    this.authService.logout(response);
    return { success: true };
  }
}
