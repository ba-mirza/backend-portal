import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { PrismaService } from '../services/prisma.service';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private prismaService: PrismaService) {}

  @Get('/all')
  async getAllCategories() {
    try {
      const categories = await this.prismaService.category.findMany();

      if (categories.length) {
        return categories;
      }

      return [];
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Something went wrong while retrieving Categories`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
