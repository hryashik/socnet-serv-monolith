import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { DeletePostById } from './dto/delete-post-byid.dto';
import { GetAllPostsByIdDto } from './dto/get-all-posts-byid.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(dto: CreatePostDto) {
    try {
      const post = await this.prisma.post.create({
        data: {
          text: dto.text,
          userId: dto.userId,
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
      if (error.code === 'P2003')
        throw new ForbiddenException('Incorrect credentials');
      throw new Error(error);
    }
  }

  async getAllPostsById(dto: GetAllPostsByIdDto) {
    try {
      return await this.prisma.post.findMany({
        where: {
          userId: dto.userId,
        },
        select: {
          id: true,
          isModified: true,
          createdAt: true,
          updatedAt: true,
          text: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deletePostById(dto: DeletePostById) {
    try {
      const posts = await this.prisma.post.findMany({
        where: {
          userId: dto.userId,
        },
      });
      if (posts.find(el => el.id === dto.id)) {
        await this.prisma.post.delete({
          where: {
            id: dto.id,
          },
        });
      } else {
        throw new Error('Incorrect id or userId')
      }
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
