import {
    Controller,
    Get,
    Post,
    HttpStatus,
    Req,
    Res,
    UseGuards,
    Body
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { ApiVersion } from '@shared/types/version';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from '../guards/google-oauth.guard';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dtos/login.dto';
import { SignUpUserDto } from '../dtos/signup.dto';
import { User } from '@modules/user/entities/user.entity';
import { FacebookOauthGuard } from '../guards/facebook-oauth.guard';

@ApiTags('auth')
@Controller({ version: ApiVersion.V1, path: 'auth' })
export class AuthController {
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
    ) { }

    @Get('google')
    @UseGuards(GoogleOauthGuard)
    async auth() { }

    @Get('google/callback')
    @UseGuards(GoogleOauthGuard)
    async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
        try {
            const token = await this.authService.signInWithGoogle(req.user as unknown as User);
            const clientSuccessUrl = this.configService.get<string>('CLIENTAUTHSUCCESSURL')!;
            
            res.cookie('access_token', token, { httpOnly: true });

            return res.redirect(HttpStatus.PERMANENT_REDIRECT, clientSuccessUrl);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Google authentication failed',
                error: error.message,
            });
        }
    }

    @Get('facebook')
    @UseGuards(FacebookOauthGuard)
    async facebookAuth() { }

    @Get('facebook/callback')
    @UseGuards(FacebookOauthGuard)
    async facebookAuthCallback(@Req() req: Request, @Res() res: Response) {
        try {
            const token = await this.authService.signInWithFacebook(req.user as unknown as User);
            const clientSuccessUrl = this.configService.get<string>('CLIENTAUTHSUCCESSURL')!;
            
            res.cookie('access_token', token, { httpOnly: true });
            return res.redirect(HttpStatus.PERMANENT_REDIRECT, clientSuccessUrl);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Facebook authentication failed',
                error: error.message,
            });
        }
    }

    @Post('login')
    @ApiBody({ type: LoginUserDto })
    async login(@Body() user: LoginUserDto, @Res() res: Response) {
        try {
            const token = await this.authService.loginWithEmail(user);
            return res.status(HttpStatus.OK).json({
                message: 'Successfully logged in.',
                data: {
                    accessToken: token
                },
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }

    @Post('register')
    @ApiBody({ type: SignUpUserDto })
    async registerUser(@Body() user: SignUpUserDto, @Res() res: Response) {
        try {
            const otpVerificationKey = await this.authService.registerUserWithEmail(user);
            return res.status(HttpStatus.OK).json({
                message: 'Registration successful. Please check your email for OTP verification.',
                data: {
                    otpVerificationKey: otpVerificationKey
                },
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }
}
