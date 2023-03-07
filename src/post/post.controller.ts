import { Body, Controller, Post, Req, ValidationPipe } from '@nestjs/common';
import { IAuthorizedRequest } from 'src/auth/interfaces/authorized-request.interface';
import { Authorization } from 'src/services/decorators/auth.decorator';
import { CreatePostBody } from './dto/create-post-body';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Authorization(true)
  @Post()
  createPost(
    @Body() {text}: CreatePostBody,
    @Req() request: IAuthorizedRequest
    ) {
    const dto: CreatePostDto = {
      text,
      userId: request.user.id
    }
    return this.postService.createPost(dto);
  }
}
