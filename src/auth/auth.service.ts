import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

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

  async login(dto: LoginDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: dto.email
        }
      })
      const verifiedPassword = argon.verify(user.hash, dto.password)
      if (!user || !verifiedPassword) {
        throw new Error()
      }
      return this.signToken(user.email)

    } catch (error) {
      throw new ForbiddenException('Incorrect credentials')
    }
  }


  private hashPassword(password: string): Promise<string> {
    const hash = argon.hash(password, {
      saltLength: 8,
    });
    return hash;
  }
  private signToken(email: string) {
    const token = this.jwtService.sign({ email });
    return {
      access_token: token,
    };
  }
  private decodeToken(token: string) {
    return this.jwtService.decode(token)
  }
}
