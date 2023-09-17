import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Prisma, Article } from '@prisma/client';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Post('/createArticle')
  async createPost(@Body() body: Prisma.ArticleCreateInput): Promise<Article> {
    return await this.articlesService.createArticle(body);
  }

  @Get('/getAllArticles')
  async getAllPosts(@Query('pages') pages: number): Promise<Article[]> {
    return await this.articlesService.getAllArticles(pages);
  }

  @Get('/getArticleById')
  async getPostById(@Query('id') id: string): Promise<Article | null> {
    return await this.articlesService.getArticleById(id);
  }
}
