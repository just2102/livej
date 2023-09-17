import { Body, Controller, Req, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { RegisterResponse } from './auth.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { IUserAuthContext } from './auth.types';

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

  @UseGuards(JwtAuthGuard)
  @Get('/protectedRoute')
  async testProtectedRoute(@Req() req: IUserAuthContext) {
    console.log('req', req.user);
    return 'this is a protected route. if you access this, you are authenticated';
  }
}
