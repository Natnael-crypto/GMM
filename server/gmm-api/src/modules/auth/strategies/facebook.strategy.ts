import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthConfig } from '@shared/config';
import { Profile, Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(configService: ConfigService) {
    const facebookConfig =
      configService.get<AuthConfig>('auth')?.oauth?.facebook;

    super({
      clientID: facebookConfig?.appId,
      clientSecret: facebookConfig?.appSecret,
      callbackURL: facebookConfig?.callbackUrl,
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };
    const payload = {
      user,
      accessToken,
    };

    done(null, payload);
  }
}
