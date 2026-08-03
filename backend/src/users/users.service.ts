import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: bcrypt.hashSync(createUserDto.password, 10),
      },
      select: SAFE_USER_SELECT,
    });
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

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
      select: SAFE_USER_SELECT,
    });
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
