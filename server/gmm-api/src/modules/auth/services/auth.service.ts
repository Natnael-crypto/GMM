import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@modules/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { NoticeService } from '@modules/notice/services/notice.service';
import { UserService } from '@modules/user/services/user.service';
import { LoginUserDto } from '../dtos/login.dto';
import * as bcrypt from 'bcrypt';
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

  async signIn(user: LoginUserDto) {
    if (!user) {
      throw new BadRequestException('No Credentials Provided');
    }

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

  async registerUser(user: LoginUserDto) {
    
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

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    return user;
  }
}
