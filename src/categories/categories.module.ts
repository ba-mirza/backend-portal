import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { PrismaService } from '../services/prisma.service';

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [PrismaService],
})
export class CategoriesModule {}
