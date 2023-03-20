import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { GatewayModule } from './gateway/gateway.module';
import { DialogModule } from './dialog/dialog.module';
import { MessageModule } from './message/message.module';
import { UsersRepositoryModule } from './repositories/usersRepository/usersRepository.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    PostModule,
    GatewayModule,
    DialogModule,
    MessageModule,
    UsersRepositoryModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
})
export class AppModule {}
