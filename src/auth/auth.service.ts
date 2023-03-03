import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async signup(dto: SignUpDto) {
    try {
      const hash = await this.hashPassword(dto.password);
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash,
        },
        select: {
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return this.signToken(user.email);
    } catch (error) {
      //P2002 - prisma error if unique filed is taken
      if (error.code === 'P2002')
        throw new ForbiddenException('Credentials is taken');
      throw new Error(error);
    }
  }

  hashPassword(password: string): Promise<string> {
    const hash = argon.hash(password, {
      saltLength: 8,
    });
    return hash;
  }
  signToken(email: string) {
    const token = this.jwtService.sign({ email });
    return {
      access_token: token,
    };
  }
}
