import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import * as argon from 'argon2'

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup(dto: SignUpDto) {
    try {
      const hash = await this.hashPassword(dto.password)
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash
        },
        select: {
          email: true,
          createdAt: true,
          updatedAt: true,
        }
      })
      return user
    } catch (error) {
      //P2002 - prisma error if unique filed is taken
      if (error.code === 'P2002') throw new ForbiddenException('Credentials is taken')
      throw new Error(error)
    }
  }

 hashPassword(password: string): Promise<string> {
    const hash = argon.hash(password, {
      saltLength: 8,
    })
    return hash
  }
}
