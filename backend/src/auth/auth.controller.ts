import { Controller, Post, Body, UseGuards, Req, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import type { Request } from 'express';
import { ResetPasswordDto } from './dto/reset-password.dto';
import type { AuthenticatedRequest } from './types/auth.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @Get()
  // pegar(@Query() id: string)

  // @Get(':id')

  @UseGuards(AuthGuard)
  @Patch('reset-password')
  resetPassword(
    @Req() request: AuthenticatedRequest,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(request, resetPasswordDto);
  }

  // @Delete(':id')
}
