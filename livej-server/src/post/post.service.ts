import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async createPost(createPostDto: Prisma.PostCreateInput): Promise<Post> {
    return await this.prisma.post.create({
      data: createPostDto,
    });
  }
}
