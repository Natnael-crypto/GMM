import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GoogleOAuthGuard } from '../guards/google-oauth.guard';
import { Request, Response } from 'express';
import { NewAuthService } from '../services/auth.service';
import { ConfigService } from '@nestjs/config';
import { ClientConfig } from '@shared/config';
import { CookieName } from '../enums/auth.enum';
import { FacebookOAuthGuard } from '../guards/facebook-oauth.guard';
import { LoginUserDto, RefreshAccessToken } from '../dtos/login.dto';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { EmailRegistrationDto } from '../dtos/registration.dto';
import { OtpService } from '../services/otp.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  OtpRequestedEvent,
  PasswordResetRequestedEvent,
  UserRegisteredEvent,
} from '../events/auth.event';
import { OtpRequestDto, OtpVerificationDto } from '../dtos/otp.dto';
import { AuthRepository } from '../services/auth.repository';
import { RequestResetPasswordDto } from '../dtos/request-reset-password.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { AccountVerificationStatus } from '@modules/user/enums/user.enum';
import { userRole } from '@shared/database/seeds/permission.seed';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly clientConfig: ClientConfig;

  constructor(
    private readonly authService: NewAuthService,
    private readonly authRepo: AuthRepository,
    private readonly configService: ConfigService,
    private readonly otpService: OtpService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.clientConfig = this.configService.get<ClientConfig>('client')!;
  }

  async handleOAuthCallback(req: Request, res: Response) {
    try {
      const user = req.user as unknown as { email: string };
      
      if (!user) {
        return res.redirect(
          HttpStatus.PERMANENT_REDIRECT,
          this.clientConfig.authFailureUrl,
        );
      }
  
      const payload = await this.authService.authenticateViaOAuth(user.email);
      const { accessToken, refreshToken } =
        await this.authService.generateTokens(payload);
      
      const successUrl = new URL(this.clientConfig.authSuccessUrl);
      successUrl.searchParams.append('accessToken', accessToken);
      successUrl.searchParams.append('refreshToken', refreshToken);
  
      return res.redirect(HttpStatus.PERMANENT_REDIRECT, successUrl.toString());
    } catch (error) {
      return res.redirect(
        HttpStatus.PERMANENT_REDIRECT,
        this.clientConfig.authFailureUrl,
      );
    }
  }
  

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleOAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleOAuthCallback(@Req() req: Request, @Res() res: Response) {
    return this.handleOAuthCallback(req, res);
  }

  @Get('facebook')
  @UseGuards(FacebookOAuthGuard)
  async facebookOAuth() {}

  @Get('facebook/callback')
  @UseGuards(FacebookOAuthGuard)
  async facebookOAuthCallback(@Req() req: Request, @Res() res: Response) {
    return this.handleOAuthCallback(req, res);
  }

  @ApiBody({ type: RefreshAccessToken })
  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(@Req() req: Request) {
    const user = req.user as unknown as any;

    const accessToken = await this.authService.generateAccessToken({
      sub: user.id,
      email: user.email,
      role: user.roleId,
    });

    return { accessToken };
  }

  @Post('login')
  @ApiBody({ type: LoginUserDto })
  async login(@Body() loginDto: LoginUserDto) {
    const payload = await this.authService.validateCredentials(
      loginDto.email,
      loginDto.password,
    );

    return await this.authService.generateTokens(payload);
  }

  @Post('register')
  @ApiBody({ type: EmailRegistrationDto })
  @ApiQuery({ name: 'token', required: false })
  async register(
    @Body() dto: EmailRegistrationDto,
    @Query('token') token?: string,
  ) {
    const user = await this.authService.registerViaEmail(
      dto,
      userRole.name,
      token,
    );
    const { otp, verificationKey } = await this.otpService.generateOtpForEmail(
      user.id,
      user.email,
      user.roleId,
    );

    this.eventEmitter.emitAsync(
      UserRegisteredEvent.name,
      new UserRegisteredEvent(user, otp),
    );

    return { otpVerificationKey: verificationKey };
  }

  @Post('otp/verification')
  async verifyOtp(@Body() dto: OtpVerificationDto) {
    const otpPayload = await this.otpService.verifyOtp(dto);

    return this.authService.generateTokens({
      sub: otpPayload.id,
      email: otpPayload.email || '',
      role: otpPayload.role,
    });
  }

  @Post('otp')
  async resendOtp(@Body() dto: OtpRequestDto) {
    if (!dto.email && !dto.phoneNumber) {
      throw new BadRequestException('Either email or phoneNumber is required');
    }
  
    let user;
    if (dto.email) {
      user = await this.authRepo.findUserByEmail(dto.email);
    } else if (dto.phoneNumber) {
      user = await this.authRepo.findUserByPhoneNumber(dto.phoneNumber); // Ensure you have this method in your repository
    }
  
    if (!user) {
      throw new BadRequestException('User not found');
    }
  
    if (user.verificationStatus === AccountVerificationStatus.VERIFIED) {
      throw new BadRequestException('Your account is already verified');
    }
  
    let otp, verificationKey;
  
    if (dto.email) {
      ({ otp, verificationKey } = await this.otpService.generateOtpForEmail(
        user.id,
        user.email,
        user.roleId,
      ));
    } else if (dto.phoneNumber) {
      ({ otp, verificationKey } = await this.otpService.generateOtpForPhone(
        user.id,
        dto.phoneNumber,
        user.roleId,
      ));
    }
  
    this.eventEmitter.emitAsync(
      OtpRequestedEvent.name,
      new OtpRequestedEvent(user, otp),
    );
  
    return { otpVerificationKey: verificationKey };
  }
  

  @Post('password-reset')
  async requestResetPassword(@Body() dto: RequestResetPasswordDto) {
    const user = await this.authRepo.findUserByEmail(dto.email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const token = await this.authService.generateResetPasswordToken({
      email: user.email,
      sub: user.id,
      role: user.roleId,
    });

    this.eventEmitter.emitAsync(
      PasswordResetRequestedEvent.name,
      new PasswordResetRequestedEvent(dto.email, token),
    );
  }

  @ApiBody({ type: ResetPasswordDto })
  @Put('password-reset')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    const { token, newPassword } = dto;
    await this.authService.resetPassword(token, newPassword);
  }
}
