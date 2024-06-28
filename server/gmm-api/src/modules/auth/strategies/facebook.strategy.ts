import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { OAuthConfig } from '@shared/config';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<OAuthConfig>('FACEBOOKOAUTH')?.client_id,
      clientSecret: configService.get<OAuthConfig>('FACEBOOKOAUTH')?.client_secret,
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    const user = {
      provider: 'facebook',
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
    };

    done(null, user);
  }
}