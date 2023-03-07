import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  createPost(dto: createPostDto) {
    try {
      this.prisma.post.create({
        data: {
          ...dto,
        },
      });
    } catch (error) {
      throw new Error(error)
    }
  }
}
