import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { CreateArticlesDTO } from './articles.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private prismaService: PrismaService) {}

  @Get('all')
  async getAllArticles() {
    return this.prismaService.article.findMany();
  }

  @Get(':id')
  async getArticle(@Param('id') id: string) {
    return this.prismaService.article.findFirst({
      where: {
        id: parseInt(id),
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

  @Post('delete')
  async deleteArticle(@Body('id') id: string) {
    try {
      await this.prismaService.article.delete({ where: { id: parseInt(id) } });
    } catch (error) {
      console.error(error);
    }
  }

  @Post('delete-selected-by-id')
  async deleteSelectedByIds(@Body() ids: number[]) {
    await this.prismaService.article.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
