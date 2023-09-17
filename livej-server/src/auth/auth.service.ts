import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterResponse } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(body: Prisma.UserCreateInput): Promise<RegisterResponse> {
    await this.prisma.user.deleteMany();
    const doesUserExist = await this.doesUserExist(body);
    if (doesUserExist) {
      throw new Error('User already exists');
    }

    const accessToken = this.jwtService.sign({ email: body.email });
    const refreshToken = this.jwtService.sign(
      {
        email: body.email,
      },
      {
        expiresIn: '14d',
      },
    );

    const user = await this.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
        refreshToken: refreshToken,
      },
    });
    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async doesUserExist(body: Prisma.UserCreateInput) {
    return await this.prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
  }

  async login(body: any) {
    return body;
  }

  async validateUser(payload: any) {
    return payload;
  }
}
