import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthConfig } from '@shared/config';
import { CookieName } from '../enums/auth.enum';
import { AuthRepository } from '../services/auth.repository';

export type JwtPayload = {
  sub: string;
  name: string;
  email: string;
  role: string;
  picture: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly authRepo: AuthRepository,
  ) {
    const extractJwtFromRequest = (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies[CookieName.ACCESS_TOKEN];
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      ignoreExpiration: false,
      secretOrKey: configService.get<AuthConfig>('auth')!.jwt.secret,
      jwtFromRequest: extractJwtFromRequest,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authRepo.findUserByEmail(payload.email);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
