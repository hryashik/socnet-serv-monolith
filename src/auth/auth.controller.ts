import { Body, Controller, Post, SetMetadata } from '@nestjs/common';
import { Authorization } from 'src/services/decorators/auth.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './interfaces/dto/login.dto';
import { SignUpDto } from './interfaces/dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }
  
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
