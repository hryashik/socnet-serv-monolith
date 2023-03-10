import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './services/guards/auth.guard';
import { GatewayModule } from './gateway/gateway.module';
import { DialogModule } from './dialog/dialog.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [AuthModule, PrismaModule, PostModule, GatewayModule, DialogModule, MessageModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
