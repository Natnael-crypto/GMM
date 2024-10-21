import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { NewAuthService } from '../services/auth.service';
import { CookieName } from '../enums/auth.enum';
import { AuthConfig } from '@shared/config';

const extractJwtFromRequest = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[CookieName.REFRESH_TOKEN];
  }

  return token || ExtractJwt.fromBodyField('refreshToken')(req);
};

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    configService: ConfigService,
    private readonly authService: NewAuthService,
  ) {
    super({
      jwtFromRequest: extractJwtFromRequest,
      secretOrKey:
        configService.get<AuthConfig>('auth')?.jwt.refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken = extractJwtFromRequest(req);

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const user = await this.authService.validateRefreshToken(
      refreshToken,
      payload.sub,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
