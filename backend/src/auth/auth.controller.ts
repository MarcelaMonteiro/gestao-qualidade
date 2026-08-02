import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { ResetPasswordDto } from './dto/reset-password.dto';
import type { AuthenticatedRequest } from './types/auth.type';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Patch('reset-password')
  resetPassword(
    @Req() request: AuthenticatedRequest,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(request, resetPasswordDto);
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  me(@Req() request: AuthenticatedRequest) {
    return this.usersService.findOne(request.user.sub);
  }
}
