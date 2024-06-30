import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@modules/user/entities/user.entity';
import { RegisterUserDto } from '../dtos/requests.dto';
import { ConfigService } from '@nestjs/config';
import { NoticeService } from '@modules/notice/services/notice.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private noticeService: NoticeService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  generateJwt(payload: any) {
    const secret = this.configService.get<string>('JWTSECRET');
    return this.jwtService.sign(payload, { secret });
  }

  async signIn(user: User) {
    if (!user) {
      throw new BadRequestException('auth_unauthenticated');
    }

    const userExists = await this.findUserByEmail(user.email);

    if (!userExists) {
      return this.registerUser(user);
    }

    return this.generateJwt({
        sub: userExists.email,
        email: userExists.email,
        name: userExists.firstName + ' ' + userExists.lastName,
      });
  }

  async registerUser(user: RegisterUserDto) {
    try {
      const newUser = this.userRepository.create({
        ...user,
      });
      await this.userRepository.save(newUser);
      
      return this.generateJwt({
        sub: newUser.email,
        email: newUser.email,
      });
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async sendOtpForSignIn(createUserDto: CreateUserDto): Promise<void> {
    try {
      const otp = this.generateOTP();

      await this.noticeService.sendOtpEmail(createUserDto.email, otp);
      
    } catch (error) {
      console.log('Failed to send OTP:', error);
      throw new InternalServerErrorException('Failed to send OTP');
    }
  }

  generateOTP(): string {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    return user;
  }
}
