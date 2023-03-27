import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategies/jwt-strategy';
import { DialogRepositoryModule } from 'src/repositories/dialogRepository/dialogRepository.module';
import { MessagesRepositoryModule } from 'src/repositories/messagesRepository/messageRepository.module';
import { UsersRepositoryModule } from 'src/repositories/usersRepository/usersRepository.module';
import { DialogController } from './dialog.controller';
import { DialogService } from './dialog.service';

@Module({
  imports: [DialogRepositoryModule, MessagesRepositoryModule, PassportModule],
  controllers: [DialogController],
  providers: [DialogService, JwtStrategy],
  exports: [DialogService]
})
export class DialogModule {}
