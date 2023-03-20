import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategies/jwt-strategy';
import { PostsRepositoryModule } from 'src/repositories/postsRepository/postsRepository.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [PostsRepositoryModule, PassportModule],
  controllers: [PostController],
  providers: [PostService, JwtStrategy],
})
export class PostModule {}
