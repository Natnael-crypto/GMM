import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../../user/entities/user.entity';
import { AuthConfig } from '@shared/config';

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
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    const extractJwtFromCookie = (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['access_token'];
      }

      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      ignoreExpiration: false,
      secretOrKey: configService.get<AuthConfig>('auth')?.jwt.secret,
      jwtFromRequest: extractJwtFromCookie,
    });
  }

  async validate(payload: JwtPayload) {
    // find user using email
    const user = await this.userRepository.findOne({
      where: { email: payload.email },
    });

    if (!user) throw new UnauthorizedException('auth_error');

    return user;
  }
}
