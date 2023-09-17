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

  async getAllPosts(pages = 1): Promise<Post[]> {
    const numOfPostsOnPage = 10;
    const maxPagesLimit = 100;
    if (pages < 1 || pages > maxPagesLimit) {
      throw new Error(
        `Invalid page number. Must be between 1 and ${maxPagesLimit}`,
      );
    }

    const skip = (pages - 1) * numOfPostsOnPage;

    return await this.prisma.post.findMany({
      skip: skip,
      take: numOfPostsOnPage,
    });
  }

  async getPostById(id: string): Promise<Post | null> {
    return await this.prisma.post.findFirst({
      where: {
        id: id,
      },
    });
  }
}
