import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService
  ) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get('secured', context.getHandler());
    if (!secured) return true;
  }
}
