import { User } from '@prisma/client';

export interface RegisterResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
