import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { AuthConfig, ClientConfig } from '@shared/config';
import { EmailRegistrationDto } from '../dtos/registration.dto';
import {
  InvalidCredentialsException,
  InvalidRegistrationTokenException,
  UserAlreadyExistsException,
} from '../exceptions/auth.exceptions';
import { guardianRole, userRole } from '@shared/database/seeds/permission.seed';
import {
  GuardianRegistrationEvent,
  GuardianRequestedEvent,
} from '@modules/user/events/guardian.events';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { NoticeService } from '@modules/notice/services/notice.service';

export type JwtPayload = {
  sub: string;
  email: string;
  role: string;
};

@Injectable()
export class NewAuthService {
  private authConfig: AuthConfig;
  private domain: string;

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private authRepo: AuthRepository,
    private noticeService: NoticeService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.authConfig = this.configService.get<AuthConfig>('auth')!;
    this.domain = this.configService.get<ClientConfig>('client')!.url;
  }

  async generateAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.authConfig.jwt.secret,
      expiresIn: this.authConfig.jwt.accessTokenExpiration,
    });
  }

  async generateRefreshToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.authConfig.jwt.refreshTokenSecret,
      expiresIn: this.authConfig.jwt.refreshTokenExpiration,
    });
  }

  async generateResetPasswordToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.authConfig.jwt.resetPasswordTokenSecret,
      expiresIn: this.authConfig.jwt.resetPasswordTokenExpiration,
    });
  }

  async generateRegistrationToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      secret: this.authConfig.jwt.registrationTokenSecret,
      expiresIn: this.authConfig.jwt.registrationTokenExpiration,
    });
  }

  async generateTokens(payload: JwtPayload) {
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.authRepo.saveRefreshToken(payload.sub, hashedRefreshToken);

    return { accessToken, refreshToken };
  }

  async validateRefreshToken(token: string, userId: string) {
    const refreshToken = await this.authRepo.findUserRefreshToken(userId);

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const isRefreshTokenValid = await bcrypt.compare(
      token,
      refreshToken.hashedToken,
    );

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException();
    }

    const user = await this.authRepo.findUserById(userId);
    if (!user) throw new UnauthorizedException();
    return user;
  }

  async validateRegistrationToken(token: string) {
    try {
      return this.jwtService.verify<JwtPayload>(token, {
        secret: this.authConfig.jwt.registrationTokenSecret,
        ignoreExpiration: false,
      });
    } catch {
      throw new UnauthorizedException();
    }
  }

  async validateResetPasswordToken(token: string) {
    try {
      return this.jwtService.verify<JwtPayload>(token, {
        secret: this.authConfig.jwt.resetPasswordTokenSecret,
        ignoreExpiration: false,
      });
    } catch {
      throw new UnauthorizedException();
    }
  }

  async validateAccessToken(token: string) {
    try {
      return this.jwtService.verify<JwtPayload>(token, {
        secret: this.authConfig.jwt.secret,
        ignoreExpiration: false,
      });
    } catch {
      throw new UnauthorizedException();
    }
  }

  async validateCredentials(email: string, password: string) {
    const user = await this.authRepo.findUserByEmail(email);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    if (!user.password) {
      throw new InvalidCredentialsException();
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new InvalidCredentialsException();
    }

    return {
      sub: user.id,
      email: user.email,
      role: user.roleId,
    };
  }

  async registerViaEmail(
    emailRegistrationDto: EmailRegistrationDto,
    roleId: string,
    token?: string,
  ) {
    const { email, password } = emailRegistrationDto;

    if (token) {
      const decodedToken = await this.validateRegistrationToken(token);

      if (decodedToken.email !== email) {
        throw new InvalidRegistrationTokenException();
      }

      roleId = decodedToken.role;
    }

    if (await this.authRepo.findUserByEmail(email)) {
      throw new UserAlreadyExistsException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.authRepo.createUser({
      ...emailRegistrationDto,
      password: hashedPassword,
      roleId,
    });
  }

  async authenticateViaOAuth(
    email: string,
    firstName?: string,
    lastName?: string,
  ): Promise<JwtPayload> {
    const user = await this.authRepo.findUserByEmail(email);

    if (!user) {
      const newUser = await this.authRepo.createUser({
        email,
        roleId: userRole.name,
        firstName,
        lastName,
      });

      return {
        sub: newUser.id,
        email: newUser.email,
        role: newUser.roleId,
      };
    }

    return {
      sub: user.id,
      email: user.email,
      role: user.roleId,
    };
  }

  async resetPassword(token: string, password: string) {
    const { email } = await this.validateResetPasswordToken(token);

    const user = await this.authRepo.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.authRepo.updateUserPassword(user.id, hashedPassword);
  }

  @OnEvent(GuardianRequestedEvent.name, { async: true })
  async handleGuardianRequestedEvent(event: GuardianRequestedEvent) {
    this.eventEmitter.emit(
      GuardianRegistrationEvent.name,
      new GuardianRegistrationEvent(
        event.user,
        event.guardian,
        event.relationship,
        await this.generateRegistrationToken({
          sub: event.guardian.email,
          email: event.guardian.email,
          phone: event.guardian.phoneNumber,
          firstName: event.guardian.firstName,
          lastName: event.guardian.lastName,
          role: guardianRole.name,
          invite: true,
        } as unknown as JwtPayload),
      ),
    );
  }
}
