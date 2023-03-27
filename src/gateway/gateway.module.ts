import { Global, Module } from '@nestjs/common';
import { DialogModule } from 'src/dialog/dialog.module';
import { DialogService } from 'src/dialog/dialog.service';
import { GatewayProvider } from './gateway.provider';

@Global()
@Module({
  imports: [DialogModule],
  providers: [GatewayProvider],
  exports: [GatewayProvider],
})
export class GatewayModule {}
