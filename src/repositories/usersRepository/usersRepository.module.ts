import { Global, Module } from '@nestjs/common';
import { UsersRepositoryService } from './usersRepository.service';

@Global()
@Module({
  providers: [UsersRepositoryService],
  exports: [UsersRepositoryService]
})
export class UsersRepositoryModule {}
