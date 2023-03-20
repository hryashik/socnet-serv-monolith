import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersRepositoryModule } from 'src/repositories/usersRepository/usersRepository.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt-strategy';

@Global()
@Module({
  imports: [
    UsersRepositoryModule,
    PassportModule,
    JwtModule.register({
      signOptions: {
        expiresIn: '24h',
      },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
