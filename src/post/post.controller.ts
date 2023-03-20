import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IAuthorizedRequest } from 'src/auth/interfaces/authorized-request.interface';
import { GatewayProvider } from 'src/gateway/gateway.provider';
import { Authorization } from 'src/services/decorators/auth.decorator';import { JwtAuthGuard } from 'src/services/guards/jwt-auth.guard';
;
import { CreatePostBody } from './dto/create-post-body';
import { CreatePostDto } from './dto/create-post.dto';
import { DeletePostById } from './dto/delete-post-byid.dto';
import { EditPostBody } from './dto/edit-post-body';
import { EditPostByIdDto } from './dto/edit-post-byid.dto';
import { GetAllPostsByIdDto } from './dto/get-all-posts-byid.dto';
import { PostService } from './post.service';

@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService, private readonly gateway: GatewayProvider) {}

  @Authorization(true)
  @Post()
  createPost(
    @Body() { text }: CreatePostBody,
    @Req() request: IAuthorizedRequest,
  ) {
    const dto: CreatePostDto = {
      text,
      userId: request.user.id,
    };
    return this.postService.createPost(dto);
  }

  @Authorization(true)
  @Get()
  getAllPostsById(@Req() request: IAuthorizedRequest) {
      const dto: GetAllPostsByIdDto = {
        userId: request.user.id,
      };
      return this.postService.getAllPostsById(dto);
  }

  @Authorization(true)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  DeletePostById(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: IAuthorizedRequest,
  ) {
    const dto: DeletePostById = {
      id,
      userId: request.user.id,
    };
    return this.postService.deletePostById(dto);
  }

  @Authorization(true)
  @Patch(':id')
  EditPostById(
    @Body() { text }: EditPostBody,
    @Param('id', ParseIntPipe) id: number,
    @Req() req: IAuthorizedRequest,
  ) {
    const dto: EditPostByIdDto = {
      text,
      id,
      userId: req.user.id,
    };
    return this.postService.editPostById(dto);
  }
}
