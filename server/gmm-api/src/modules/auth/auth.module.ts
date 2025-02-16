import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/roles.controller';
import { AuthConfig } from '@shared/config';
import { RefreshToken } from './entities/refresh-token.entity';
import { NewAuthService } from './services/auth.service';
import { AuthRepository } from './services/auth.repository';
import { OtpService } from './services/otp.service';
import { Otp } from './entities/otp.entity';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh.strategy';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from './strategies/apikey.strategy';
import { ApiKeysController } from './controllers/apikey.controller';
import { ApiKeyService } from './services/apikey.service';
import { ApiKey } from './entities/apikey.entity';
import { NoticeModule } from '@modules/notice/notice.module';
import { JwtOrInviteStrategy } from './strategies/jwt-or-invite.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission, Role, RefreshToken, Otp, ApiKey]),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const jwtConfig = configService.get<AuthConfig>('auth')?.jwt;
        return {
          secret: jwtConfig?.secret,
          signOptions: {
            expiresIn: jwtConfig?.accessTokenExpiration,
          },
        };
      },
    }),
    NoticeModule.forRootAsync(),
  ],
  controllers: [AuthController, RoleController, ApiKeysController],
  providers: [
    NewAuthService,
    AuthRepository,
    JwtService,
    ApiKeyService,
    OtpService,
    RoleService,
    GoogleStrategy,
    FacebookStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    ApiKeyStrategy,
    JwtOrInviteStrategy,
  ],
  exports: [NewAuthService, JwtService, ApiKeyService],
})
export class AuthModule {}
