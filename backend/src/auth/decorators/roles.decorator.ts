import { SetMetadata } from '@nestjs/common';
import { Roles as RolesEnum } from 'generated/prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES_KEY, roles);
