import { Module } from "@nestjs/common";
import { PostsRepositoryService } from "./postsRepository.service";

@Module({
  providers: [PostsRepositoryService],
  exports: [PostsRepositoryService]
})

export class PostsRepositoryModule {}