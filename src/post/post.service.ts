import { ForbiddenException, Injectable } from '@nestjs/common';
import { PostsRepositoryService } from 'src/repositories/postsRepository/postsRepository.service';
import { CreatePostDto } from './dto/create-post.dto';
import { DeletePostById } from './dto/delete-post-byid.dto';
import { EditPostByIdDto } from './dto/edit-post-byid.dto';
import { GetAllPostsByIdDto } from './dto/get-all-posts-byid.dto';
import { PostModel } from 'src/repositories/postsRepository/postsRepository.service';

@Injectable()
export class PostService {
  constructor(private readonly postsRepository: PostsRepositoryService) {}

  async createPost(dto: CreatePostDto) {
    try {
      const post = await this.postsRepository.create(dto.userId, dto.text);
      return post;
    } catch (error) {
      if (error.code === 'P2003')
        throw new ForbiddenException('Incorrect credentials');
      throw new Error(error);
    }
  }

  async getAllPostsById(dto: GetAllPostsByIdDto) {
    try {
      return await this.postsRepository.findManyById(dto.userId);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deletePostById(dto: DeletePostById) {
    try {
      const posts = await this.postsRepository.findManyById(dto.userId);
      if (posts.length && posts.find((el: PostModel) => el.id === dto.id)) {
        await this.postsRepository.deleteById(dto.id);
      } else {
        throw new Error('Incorrect id or userId');
      }
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async editPostById(dto: EditPostByIdDto) {
    try {
      const userPosts = await this.postsRepository.findManyById(dto.userId);
      if (
        userPosts.find((el: PostModel) => el.id === dto.id)
      ) {
        const post = await this.postsRepository.updateById(dto.id, dto.text);
        return post;
      } else {
        throw new ForbiddenException('Incorrect credentials');
      }
    } catch (error) {
      if (error.status === 403) throw new ForbiddenException(error.message);
      throw new Error();
    }
  }
}
