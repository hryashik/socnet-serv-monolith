import { Module } from '@nestjs/common';
import { DialogRepositoryModule } from 'src/repositories/dialogRepository/dialogRepository.module';
import { MessagesRepositoryModule } from 'src/repositories/messagesRepository/messageRepository.module';
import { UsersRepositoryModule } from 'src/repositories/usersRepository/usersRepository.module';
import { DialogController } from './dialog.controller';
import { DialogService } from './dialog.service';

@Module({
  imports: [DialogRepositoryModule, MessagesRepositoryModule],
  controllers: [DialogController],
  providers: [DialogService],
  exports: [DialogService]
})
export class DialogModule {}
