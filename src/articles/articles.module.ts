import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  imports: [],
  controllers: [ArticlesController],
  providers: [PrismaService],
})
export class ArticlesModule {}
