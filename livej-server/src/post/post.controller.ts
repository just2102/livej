import { Body, Controller, Post } from '@nestjs/common';
import { Prisma, Post as JPost } from '@prisma/client';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @Post('/createPost')
  async createPost(@Body() body: Prisma.PostCreateInput): Promise<JPost> {
    return await this.postService.createPost(body);
  }
}
