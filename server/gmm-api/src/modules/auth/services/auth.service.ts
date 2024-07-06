import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@modules/user/entities/user.entity';
import { RegisterUserDto } from '../dtos/requests.dto';
import { ConfigService } from '@nestjs/config';
import { NoticeService } from '@modules/notice/services/notice.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '@modules/user/services/user.service';
import { LoginUserDto } from '../dtos/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private noticeService: NoticeService,
    private userService: UserService,
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
    console.log(userExists);

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
      
      return this.generateJwt({
        sub: newUser.email,
        email: newUser.email,
      });
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
