import { Injectable } from '@nestjs/common';
import slug from 'slug';

@Injectable()
export class SlugService {
  constructor() {}

  toSlug(str: string): string {
    return slug(str, '-');
  }
}
