import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { LoginRequestDTO, RegisterRequestDTO } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterRequestDTO) {
    try {
      const { name, email, password } = dto;

      const existingUser = await this.prismaService.auth.findUnique({
        where: {
          login: email,
        },
      });
      if (existingUser) throw new ConflictException('User already exists');

      const hashed = await bcrypt.hash(password, 12);

      const user = await this.prismaService.auth.create({
        data: {
          login: email,
          password: hashed,
          user: { create: { name } },
        },
        include: { user: true },
      });

      return this.generateToken(user.id, user.login);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async login(dto: LoginRequestDTO) {
    try {
      const user = await this.prismaService.auth.findUnique({
        where: { login: dto.email },
        include: { user: true },
      });
      if (!user) throw new UnauthorizedException('Invalid login credentials');

      const valid = await bcrypt.compare(dto.password, user.password);
      if (!valid)
        throw new UnauthorizedException('Invalid password credentials');

      return this.generateToken(user.id, user.login);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  private generateToken(userId: number, email: string) {
    const payload = { sub: userId, email };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
