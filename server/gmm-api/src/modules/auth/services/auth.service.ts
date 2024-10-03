import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@modules/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from '../dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { SignUpUserDto } from '../dtos/signup.dto';
import { OTPService } from '@modules/otp/services/otp.service';
import { OnEvent } from '@nestjs/event-emitter';
import { NoticeService } from '@modules/notice/services/notice.service';
import { GuardianRequestedEvent } from '@modules/user/events/guardian.events';

@Injectable()
export class AuthService {
  private domain: string;
  private secret: string;
  private resetPasswordSecret: string;
  private resetPasswordExpiration: number;

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private otpService: OTPService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private noticeService: NoticeService,
  ) {
    this.domain = this.configService.get<string>('DOMAIN')!;
    this.secret = this.configService.get<string>('JWTSECRET')!;
    this.resetPasswordSecret = this.configService.get<string>('RESET_PASSWORD_SECRET')!;
    this.resetPasswordExpiration = this.configService.get<number>('RESET_PASSWORD_EXPIRATION') || 3600;
  }

  generateJwt(payload: any) {
    return this.jwtService.sign(payload, { secret: this.secret });
  }

  async validateUser(payload: any) {
    return await this.findUserByEmail(payload.email);
  }

  async signInWithGoogle(user: User) {
    if (!user) {
      throw new BadRequestException('auth_unauthenticated');
    }

    const userExists = await this.findUserByEmail(user.email);

    if (!userExists) {
      return this.signUpWithGoogle(user);
    }

    return this.generateJwt({
      sub: userExists.email,
      email: userExists.email,
      name: userExists.firstName + ' ' + userExists.lastName,
    });
  }

  async signUpWithGoogle(user: User) {
    try {
      const newUser = this.userRepository.create({
        ...user,
        hasPassword: false,
      });
  
      await this.userRepository.save(newUser);
  
      return this.generateJwt({
        sub: newUser.email,
        email: newUser.email,
        name: newUser.firstName + ' ' + newUser.lastName,
      });
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
  

  async signInWithFacebook(user: User) {
    if (!user) {
      throw new BadRequestException('auth_unauthenticated');
    }

    const userExists = await this.findUserByEmail(user.email);

    if (!userExists) {
      return this.signUpWithFacebook(user);
    }

    return this.generateJwt({
      sub: userExists.email,
      email: userExists.email,
      name: userExists.firstName + ' ' + userExists.lastName,
    });
  }

  async signUpWithFacebook(user: User) {
    try {
      const newUser = this.userRepository.create({
        ...user,
        hasPassword: false,
      });

      return this.generateJwt({
        sub: newUser.email,
        email: newUser.email,
        name: newUser.firstName + ' ' + newUser.lastName,
      });
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async registerUserWithEmail(user: SignUpUserDto & { roleId?: string }) {
    const userExists = await this.findUserByEmail(user.email);
    if (userExists) {
      throw new BadRequestException('Email Exists');
    }
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = this.userRepository.create({
        ...user,
        password: hashedPassword,
      });
      await this.userRepository.save(newUser);

      const otpResult = await this.otpService.generateAndSendOTP(
        newUser.email,
        'VERIFICATION',
      );
      if (otpResult.Status !== 'Success') {
        throw new InternalServerErrorException('Failed to send OTP');
      }

      return {
        message:
          'Registration successful. Please check your email for OTP verification.',
        otpDetails: otpResult.Details,
      };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async loginWithEmail(user: LoginUserDto) {
    const userExists = await this.findUserByEmail(user.email);
  
    if (!userExists) {
      throw new BadRequestException('Email does not exist');
    }
  
    if (!userExists.hasPassword) {
      const setPasswordLink = await this.generateSetPasswordLink(user.email);
      return {
        message: 'You have not set a password yet. Please check your email to set one.',
        setPasswordLink,
      };
    }
  
    const isPasswordValid = await bcrypt.compare(
      user.password,
      userExists.password,
    );
  
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }
  
    return this.generateJwt({
      sub: userExists.email,
      id: userExists.id,
      email: userExists.email,
      name: userExists.firstName + ' ' + userExists.lastName,
    });
  }
  

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    return user;
  }

  async generateSetPasswordLink(email: string): Promise<string> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
  
    const token = this.jwtService.sign(
      { email: user.email },
      { 
        secret: this.resetPasswordSecret, 
        expiresIn: this.resetPasswordExpiration 
      }
    );
  
    return `${this.domain}/set-password?token=${token}`;
  }
  
  
  async setPassword(token: string, newPassword: string): Promise<void> {
    try {
      const decoded = this.jwtService.verify(token, { secret: this.resetPasswordSecret });
      const email = decoded.email;
  
      const user = await this.findUserByEmail(email);
      if (!user) {
        throw new BadRequestException('Invalid token or user not found');
      }
  
      if (user.hasPassword) {
        throw new BadRequestException('Password already set for this account');
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.hasPassword = true;
      await this.userRepository.save(user);
    } catch (e) {
      throw new BadRequestException('Invalid or expired token');
    }
  }
  

  async generateRegistrationLink(email: string) {
    const token = this.jwtService.sign({ email }, { secret: this.secret });
    return `${this.domain}/en/register-via-link?token=${token}`;
  }

  async extractEmail(token: string): Promise<string> {
    const decoded = this.jwtService.verify(token, {
      secret: this.secret,
    });

    if (!decoded) {
      throw new BadRequestException('Invalid token');
    }

    return decoded.email;
  }
  @OnEvent(GuardianRequestedEvent.name, { async: true })
  async sendRegistrationLinkToGuardian(
    guardianRequest: GuardianRequestedEvent,
  ) {
    const { user, guardianEmail } = guardianRequest;

    const registrationLink = await this.generateRegistrationLink(guardianEmail);

    await this.noticeService.sendEmail(
      guardianEmail,
      'Guardian Request',
      `Hello. ${user.firstName} ${user.lastName} has requested you to be ${user.gender === 'Male' ? 'his' : 'her'} guardian. Please visit <a href=${registrationLink}>Guardian/Wali</a> to create account and accept the request.`,
    );
  }

  // Generate Reset Password Token
  async generateResetPasswordToken(email: string): Promise<string> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const token = this.jwtService.sign(
      { email: user.email },
      { 
        secret: this.resetPasswordSecret,
        expiresIn: this.resetPasswordExpiration,
      }
    );

    return `${this.domain}/reset-password?token=${token}`;
  }

  // Send Reset Password Email
  async sendResetPasswordEmail(email: string): Promise<void> {
    const resetPasswordLink = await this.generateResetPasswordToken(email);

    await this.noticeService.sendEmail(
      email,
      'Guardian Match Making: Reset Password Request',
      `Click the following link to reset your password: <a href="${resetPasswordLink}">Reset Password</a>`
    );
  }

  // Handle Reset Password Request
  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const decoded = this.jwtService.verify(token, { secret: this.resetPasswordSecret });
      const email = decoded.email;

      const user = await this.findUserByEmail(email);
      if (!user) {
        throw new BadRequestException('Invalid token or user not found');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await this.userRepository.save(user);
    } catch (e) {
      throw new BadRequestException('Invalid or expired token');
    }
  }
}
