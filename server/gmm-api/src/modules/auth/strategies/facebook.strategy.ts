import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthConfig } from '@shared/config';
import { Profile, Strategy, VerifyCallback } from 'passport-facebook';

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
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    console.log('Profile:', profile);
    const { id, name, emails, photos } = profile;

    const user = {
      provider: 'facebook',
      providerId: id,
      email: emails?.[0]?.value || null,
      name: `${name?.givenName || ''} ${name?.familyName || ''}`.trim(),
      picture: photos?.[0]?.value || null,
    };

    done(null, user);
  }
}
