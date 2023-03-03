import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {config} from 'dotenv'

@Module({
  imports: [JwtModule.register({
    signOptions: {
      expiresIn: '24h'
    },
    secret: process.env.JWT_SECRET
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
