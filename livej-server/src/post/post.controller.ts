import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Prisma, Post as JPost } from '@prisma/client';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('/createPost')
  async createPost(@Body() body: Prisma.PostCreateInput): Promise<JPost> {
    return await this.postService.createPost(body);
  }

  @Get('/getAllPosts')
  async getAllPosts(@Query('pages') pages: number): Promise<JPost[]> {
    return await this.postService.getAllPosts(pages);
  }

  @Get('/getPostById')
  async getPostById(@Query('id') id: string): Promise<JPost | null> {
    return await this.postService.getPostById(id);
  }
}
