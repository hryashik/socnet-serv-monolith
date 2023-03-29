import { Global, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { JwtWsStrategy } from 'src/auth/strategies/jwt-ws-strategy';
import { DialogModule } from 'src/dialog/dialog.module';
import { GatewayProvider } from './gateway.provider';

@Global()
@Module({
  imports: [DialogModule, AuthModule],
  providers: [GatewayProvider, JwtWsStrategy],
  exports: [GatewayProvider],
})
export class GatewayModule {}
