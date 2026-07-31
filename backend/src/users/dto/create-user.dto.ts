import { Roles } from 'generated/prisma/client';

export class CreateUserDto {
  name!: string;
  email!: string;
  password!: string;
  role!: Roles;
}
