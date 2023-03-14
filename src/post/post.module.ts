import { Module } from '@nestjs/common';
import { PostsRepositoryModule } from 'src/repositories/postsRepository/postsRepository.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [PostsRepositoryModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
