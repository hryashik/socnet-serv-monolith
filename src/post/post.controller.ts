import { Controller, Post } from '@nestjs/common';
import { Authorization } from 'src/services/decorators/auth.decorator';
import { createPostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Authorization(true)
  @Post()
  createPost(dto: createPostDto) {
    return this.postService.createPost(dto);
  }
}
