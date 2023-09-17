import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Prisma, Article } from '@prisma/client';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { IUserAuthContext } from 'src/auth/auth.types';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Post('/createArticle')
  @UseGuards(JwtAuthGuard)
  async createArticle(
    @Body() body: Prisma.ArticleCreateWithoutUserInput,
    @Req() req: IUserAuthContext,
  ): Promise<Article> {
    return await this.articlesService.createArticle(body, req.user.email);
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

  @Get('/getUserArticles')
  async getUserArticles(@Query('userId') userId: string) {
    return await this.articlesService.getUserArticles(userId);
  }
}
