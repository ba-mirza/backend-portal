import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';

export class CreateArticleRequestDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  isPublished: boolean;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  category: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  authorId: number;

  // Преобразуем строку JSON в массив чисел
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : undefined;
      } catch {
        return undefined;
      }
    }
    return Array.isArray(value) ? value : undefined;
  })
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

export class RequestArticlesDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @IsOptional()
  @IsDateString()
  publishedAt?: string;

  @IsOptional()
  @IsInt()
  views?: number;

  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsInt()
  categoryId: number;

  @IsInt()
  authorId: number;

  @IsOptional()
  tags?: number[];
}

export class UpdateArticlesDTO extends PartialType(RequestArticlesDTO) {}