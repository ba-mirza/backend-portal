import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { CreateArticlesDTO } from './articles.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private prismaService: PrismaService) {}

  @Get('all')
  getAllArticles() {
    return this.prismaService.article.findMany();
  }

  @Get(':id')
  getArticle() {
    return this.prismaService.article.findFirst({
      where: {
        id: 1,
      },
    });
  }

  @Post('create')
  async createArticle(@Body() article: CreateArticlesDTO) {
    const { tags, ...articleData } = article;

    return this.prismaService.article.create({
      data: {
        ...articleData,
        tags: tags
          ? {
              connect: tags.map((id) => ({ id })),
            }
          : undefined,
      },
    });
  }

  // updateArticle() {}

  // deleteArticle(id: number) {}
}
