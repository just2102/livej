import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { RegisterResponse } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/register')
  async register(
    @Body() body: Prisma.UserCreateInput,
  ): Promise<RegisterResponse> {
    return await this.authService.register(body);
  }

  @Post('/login')
  async login(@Body() body: Prisma.UserCreateInput): Promise<User> {
    return await this.authService.login(body);
  }
}
