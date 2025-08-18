import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { PrismaService } from 'src/services/prisma.service';
import { SlugService } from '../services/slug.service';
import { UploadService } from '../services/upload.service';

@Module({
  imports: [],
  controllers: [ArticlesController],
  providers: [PrismaService, SlugService, UploadService],
})
export class ArticlesModule {}
