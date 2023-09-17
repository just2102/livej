import { Injectable } from '@nestjs/common';
import { Article, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async createArticle(
    createArticleDto: Prisma.ArticleCreateInput,
  ): Promise<Article> {
    return await this.prisma.article.create({
      data: createArticleDto,
    });
  }

  async getAllArticles(pages = 1): Promise<Article[]> {
    const numOfPostsOnPage = 10;
    const maxPagesLimit = 100;
    if (pages < 1 || pages > maxPagesLimit) {
      throw new Error(
        `Invalid page number. Must be between 1 and ${maxPagesLimit}`,
      );
    }

    const skip = (pages - 1) * numOfPostsOnPage;

    return await this.prisma.article.findMany({
      skip: skip,
      take: numOfPostsOnPage,
    });
  }

  async getArticleById(id: string): Promise<Article | null> {
    return await this.prisma.article.findFirst({
      where: {
        id: id,
      },
    });
  }

  async deleteArticleById(id: string): Promise<Article> {
    return await this.prisma.article.delete({
      where: {
        id: id,
      },
    });
  }
}
