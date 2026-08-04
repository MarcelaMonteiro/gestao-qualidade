import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ResetPasswordDto } from './dto/reset-password.dto';
import type { AuthenticatedRequest } from './types/auth.type';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async login(loginDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha inválida.');
    }

    if (!user.isActive) {
      throw new UnauthorizedException(
        'Sua conta está desativada. Entre em contato com um administrador.',
      );
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' },
    );
    return { accessToken: token };
  }
  async resetPassword(
    request: AuthenticatedRequest,
    resetPassordDto: ResetPasswordDto,
  ) {
    const usuarioId = request.user.sub;

    const user = await this.prismaService.user.findUnique({
      where: {
        id: usuarioId,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const isPasswordValid = await bcrypt.compare(
      resetPassordDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha inválida.');
    }

    const newPasswordHash = await bcrypt.hash(resetPassordDto.newPassword, 10);
    await this.prismaService.user.update({
      where: { id: usuarioId },
      data: { password: newPasswordHash },
    });
    return {
      message: 'Senha alterada com sucesso.',
    };
  }
}
