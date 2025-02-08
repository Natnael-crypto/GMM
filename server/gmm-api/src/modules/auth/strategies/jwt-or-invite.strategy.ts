import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { CookieName } from '../enums/auth.enum';
import { AuthRepository } from '../services/auth.repository';
import { Request } from 'express';
import { NewAuthService } from '../services/auth.service';

export type JwtPayload = {
  sub: string;
  name: string;
  email: string;
  role: string;
  picture: string;
  invite: boolean;
};

const extractJwtFromRequest = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[CookieName.ACCESS_TOKEN];
  }

  return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
};

@Injectable()
export class JwtOrInviteStrategy extends PassportStrategy(
  Strategy,
  'jwt-or-invite',
) {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly authService: NewAuthService,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: extractJwtFromRequest,
    });
  }

  async authenticate(req: Request, options?: any) {
    const token = extractJwtFromRequest(req);

    if (!token) {
      this.fail(new UnauthorizedException(), 401);
      return;
    }

    let verified;
    try {
      // Check invitation
      verified = await this.authService.validateRegistrationToken(token);
    } catch (e) {
      try {
        // Check login
        verified = this.authService.validateAccessToken(token);
      } catch (e) {}
    }

    if (!verified) {
      this.fail(new UnauthorizedException(), 401);
      return;
    }

    const user = await this.authRepo.findUserByEmail(verified.email);

    // allow access if user is not found and the request is an invite
    if (!user && !verified.invite) throw new UnauthorizedException();

    this.success(user ?? verified);
  }
}
