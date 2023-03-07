import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
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

    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()
    
    const tokenInfo = this.authService.decodeToken(request.headers.authorization)
    const userInfo = await this.authService.getUserByEmail(tokenInfo)
    if (!tokenInfo || !userInfo) throw new UnauthorizedException()

    request.user = userInfo
    return true
  }
}
