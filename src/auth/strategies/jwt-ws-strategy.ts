import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { ITokenPayload } from '../interfaces/token-payload';

@Injectable()
export class JwtWsStrategy extends PassportStrategy(Strategy, 'jwtws') {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: ITokenPayload) {
    console.log(payload)
    const user = await this.authService.findByEmail(payload.email)
    if (!user) throw new WsException('Unauthorized')
    return user;
  }
}
