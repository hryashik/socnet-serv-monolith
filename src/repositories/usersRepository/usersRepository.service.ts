import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(email: string, hash: string) {
    return this.prisma.user.create({
      data: {
        email,
        hash,
      },
      select: {
        email: true,
        createdAt: true,
        updatedAt: true,
        id: true
      },
    });
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }
}
