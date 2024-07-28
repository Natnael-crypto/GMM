import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@modules/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from '../dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { SignUpUserDto } from '../dtos/signup.dto';
import { OTPService } from '@modules/otp/services/otp.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private otpService: OTPService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  generateJwt(payload: any) {
    const secret = this.configService.get<string>('JWTSECRET');
    return this.jwtService.sign(payload, { secret });
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
        ...user,});

      return this.generateJwt({
        sub: newUser.email,
        email: newUser.email,
        name: newUser.firstName + ' ' + newUser.lastName,
      });
    } catch (e) {
      throw new InternalServerErrorException();
    }

  }


  async registerUserWithEmail(user: SignUpUserDto) {
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
      
      const otpResult = await this.otpService.generateAndSendOTP(newUser.email, 'VERIFICATION');
      if (otpResult.Status !== 'Success') {
        throw new InternalServerErrorException('Failed to send OTP');
      }

      return {
        message: 'Registration successful. Please check your email for OTP verification.',
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

    const isPasswordValid = await bcrypt.compare(user.password, userExists.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    return this.generateJwt({
      sub: userExists.email,
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
}
