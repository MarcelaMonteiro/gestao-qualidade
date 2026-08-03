import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Roles } from 'generated/prisma/client';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsEnum(Roles)
  role!: Roles;
}
