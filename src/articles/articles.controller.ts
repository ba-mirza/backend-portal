import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { CreateArticleRequestDTO } from './articles.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { SlugService } from '../services/slug.service';
import { UploadService } from '../services/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@Controller('articles')
export class ArticlesController {
  constructor(
    private prismaService: PrismaService,
    private slugService: SlugService,
    private uploadService: UploadService,
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
  @UseInterceptors(FileInterceptor('imagePreview'))
  async createArticle(
    @Body() article: CreateArticleRequestDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png)$/,
          }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    try {
      const { tags, category, ...articleData } = article;

      const slugOfArticle = this.slugService.toSlug(articleData.title);
      let coverImageUrl: string | null = null;

      if (file) {
        const fileExtension = file.originalname.split('.').pop();
        const uniqueFileName = `articles/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;

        coverImageUrl = await this.uploadService.uploadImageFile(
          uniqueFileName,
          file.buffer,
        );
      }

      let tagConnections;
      if (tags?.length) {
        const tagsResponse = tags.map(async (tagName: string) => {
          return await this.prismaService.tag.upsert({
            where: { name: tagName.trim() },
            update: {},
            create: {
              name: tagName.trim(),
            },
          });
        });

        const createdTags = await Promise.all(tagsResponse);
        tagConnections = {
          connect: createdTags.map((tag) => ({ id: tag.id })),
        };
      }

      return this.prismaService.article.create({
        data: {
          ...articleData,
          slug: slugOfArticle,
          coverImage: coverImageUrl,
          categoryId: category,
          tags: tagConnections,
        },
        include: {
          category: true,
          tags: true,
        },
      });
    } catch (error) {
      console.error('Error creating article:', error);
      throw new BadRequestException('Failed to create article');
    }
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
