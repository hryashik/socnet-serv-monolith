import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(dto: CreatePostDto) {
    try {
      const post = await this.prisma.post.create({
        data: {
          text: dto.text,
          userId: 222,
        },
        select: {
          id: true,
          isModified: true,
          createdAt: true,
          updatedAt: true,
          text: true,
        },
      });
      return post;
    } catch (error) {
      if (error.code === 'P2003') throw new ForbiddenException('Incorrect credentials');
      throw new Error(error)
    }
  }
}
