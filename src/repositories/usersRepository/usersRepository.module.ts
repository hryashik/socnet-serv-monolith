import { Module } from '@nestjs/common';
import { UsersRepositoryService } from './usersRepository.service';

@Module({
  providers: [UsersRepositoryService],
  exports: [UsersRepositoryService]
})
export class UsersRepositoryModule {}
