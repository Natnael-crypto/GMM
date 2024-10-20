import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { GoogleStrategy } from './strategies/google.startegy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { NoticeModule } from '@modules/notice/notice.module';
import { NoticeService } from '@modules/notice/services/notice.service';
import { UserService } from '@modules/user/services/user.service';
import { OTPModule } from '@modules/otp/otp.module';
import { OTPService } from '@modules/otp/services/otp.service';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/roles.controller';
import { AuthConfig } from '@shared/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission, Role]),
    UserModule,
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
    NoticeModule.forRootAsync({
      listsProvider: UserService,
      listsImports: [UserModule],
      envTransport: 'EMAIL_SMTP_CONNECTION',
      from: 'betabravah@gmail.com',
    }),
    OTPModule,
  ],
  controllers: [AuthController, RoleController],
  providers: [
    AuthService,
    GoogleStrategy,
    FacebookStrategy,
    JwtStrategy,
    NoticeService,
    OTPService,
    JwtService,
    RoleService,
  ],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
