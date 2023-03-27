import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { GatewayModule } from './gateway/gateway.module';
import { DialogModule } from './dialog/dialog.module';
import { UsersRepositoryModule } from './repositories/usersRepository/usersRepository.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    PostModule,
    GatewayModule,
    DialogModule,
    UsersRepositoryModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule
  ],
})
export class AppModule {}
