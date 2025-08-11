import { Body, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { RegisterRequestDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async login() {}

  async register(dto: RegisterRequestDTO) {
    const { name, email, password } = dto;

    const existingUser = await this.prismaService.auth.findUnique({
      where: {
        login: email,
      },
    });

    if (!existingUser) {
      return this.prismaService.auth.create({
        data: {
          login: email,
          password: password,
          user: {
            create: {
              name: name,
            },
          },
        },
      });
    }

    throw new ConflictException('User already exists');
  }

  async logout() {}

  private generateToken() {}
}
