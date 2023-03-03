import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './services/guards/auth.guard';

@Module({
  imports: [AuthModule, PrismaModule, PostModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
