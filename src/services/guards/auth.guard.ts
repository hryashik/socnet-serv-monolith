import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { UsersRepositoryService } from 'src/repositories/usersRepository/usersRepository.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly userRepository: UsersRepositoryService
  ) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get('secured', context.getHandler());
    if (!secured) return true;

    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()
    
    const tokenInfo = this.authService.decodeToken(request.headers.authorization)
    const userInfo = await this.userRepository.findByEmail(tokenInfo)
    if (!tokenInfo || !userInfo) throw new UnauthorizedException()

    request.user = userInfo
    return true
  }
}
