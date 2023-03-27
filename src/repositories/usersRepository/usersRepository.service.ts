import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(email: string, hash: string): Promise<User | undefined> {
    return this.prisma.user.create({
      data: {
        email,
        hash,
        displayName: email.split('@')[0],
      },
    });
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async findById(id: number): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        id,
      }
    });
  }
}
