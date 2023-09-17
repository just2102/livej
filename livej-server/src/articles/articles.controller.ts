import { Body, Controller, Get, Post, Delete, Query } from '@nestjs/common';
import { Prisma, Article } from '@prisma/client';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Post('/createArticle')
  async createArticle(
    @Body() body: Prisma.ArticleCreateInput,
  ): Promise<Article> {
    return await this.articlesService.createArticle(body);
  }

  @Delete('/deleteArticleById')
  async deleteArticle(@Query('id') id: string): Promise<Article> {
    return await this.articlesService.deleteArticleById(id);
  }

  @Get('/getAllArticles')
  async getAllArticles(@Query('pages') pages: number): Promise<Article[]> {
    return await this.articlesService.getAllArticles(pages);
  }

  @Get('/getArticleById')
  async getArticleById(@Query('id') id: string): Promise<Article | null> {
    return await this.articlesService.getArticleById(id);
  }
}
