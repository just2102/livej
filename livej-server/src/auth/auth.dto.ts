import { User } from '@prisma/client';

export interface RegisterResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenDto {
  email: string;
  refreshToken: string;
}
