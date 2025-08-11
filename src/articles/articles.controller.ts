import { Body, Controller, Get } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';

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

  // updateArticle() {}

  // deleteArticle(id: number) {}
}