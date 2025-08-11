import { Module } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [PrismaService],
})
export class AuthModule {}
