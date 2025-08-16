import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { CreateArticlesDTO } from './articles.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { SlugService } from '../services/slug.service';

@UseGuards(JwtAuthGuard)
@Controller('articles')
export class ArticlesController {
  constructor(
    private prismaService: PrismaService,
    private slugService: SlugService,
  ) {}

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

    articleData.slug = this.slugService.toSlug(articleData.title);

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

  @Post('delete-by-id')
  async deleteSelectedByIds(@Body() ids: number[]) {
    await this.prismaService.article.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
