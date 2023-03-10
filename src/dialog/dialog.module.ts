import { Module } from '@nestjs/common';
import { MessageModule } from 'src/message/message.module';
import { DialogService } from './dialog.service';

@Module({
  providers: [DialogService],
  exports: [DialogService]
})
export class DialogModule {}
