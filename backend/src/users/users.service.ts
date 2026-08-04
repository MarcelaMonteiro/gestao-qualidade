import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from 'generated/prisma/client';

const SAFE_USER_SELECT = {
  id: true,
  email: true,
  name: true,
  role: true,
  isActive: true,
} as const;

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  private async runWithUniqueEmailCheck<T>(
    operation: () => Promise<T>,
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Este e-mail já está cadastrado.');
      }
      throw error;
    }
  }

  create(createUserDto: CreateUserDto) {
    return this.runWithUniqueEmailCheck(() =>
      this.prismaService.user.create({
        data: {
          ...createUserDto,
          password: bcrypt.hashSync(createUserDto.password, 10),
        },
        select: SAFE_USER_SELECT,
      }),
    );
  }

  findAll() {
    return this.prismaService.user.findMany({ select: SAFE_USER_SELECT });
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      select: SAFE_USER_SELECT,
    });
  }

  update(id: string, updateUserDto: UpdateUserDto, requesterId: string) {
    if (id === requesterId && updateUserDto.role !== undefined) {
      throw new ForbiddenException(
        'Você não pode alterar o perfil da própria conta.',
      );
    }

    return this.runWithUniqueEmailCheck(() =>
      this.prismaService.user.update({
        where: { id },
        data: updateUserDto,
        select: SAFE_USER_SELECT,
      }),
    );
  }

  setActive(id: string, isActive: boolean, requesterId: string) {
    if (id === requesterId) {
      throw new ForbiddenException(
        'Você não pode alterar o status da própria conta.',
      );
    }
    return this.prismaService.user.update({
      where: { id },
      data: { isActive },
      select: SAFE_USER_SELECT,
    });
  }

  remove(id: string, requesterId: string) {
    if (id === requesterId) {
      throw new ForbiddenException('Você não pode excluir a própria conta.');
    }
    return this.prismaService.user.delete({
      where: { id },
      select: SAFE_USER_SELECT,
    });
  }
}
