import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export interface PostModel {
  id: number;
  isModified: boolean;
  createdAt: Date;
  updatedAt: Date;
  text: string;
}

@Injectable()
export class PostsRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, text: string): Promise<PostModel> {
    return this.prisma.post.create({
      data: {
        userId,
        text,
      },
      select: {
        id: true,
        isModified: true,
        createdAt: true,
        updatedAt: true,
        text: true,
      },
    });
  }

  async findManyById(userId: number): Promise<PostModel[] | []> {
    return this.prisma.post.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        isModified: true,
        createdAt: true,
        updatedAt: true,
        text: true,
      },
    });
  }

  async deleteById(id: number): Promise<void> {
    this.prisma.post.delete({
      where: {
        id,
      },
    });
  }

  async updateById(id: number, text: string): Promise<PostModel> {
    return this.prisma.post.update({
      where: {
        id,
      },
      data: {
        text,
        isModified: true,
      },
    });
  }
}
