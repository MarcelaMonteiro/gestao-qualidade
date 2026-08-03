import type { Request } from 'express';
import type { Roles } from 'generated/prisma/client';

export type JwtPayload = {
  sub: string;
  email: string;
};

export type AuthenticatedUser = {
  sub: string;
  email: string;
  role: Roles;
  isActive: boolean;
};

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
