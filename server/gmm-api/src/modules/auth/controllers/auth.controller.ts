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
import { ApiQuery, ApiTags, ApiBody } from '@nestjs/swagger';
import { ApiVersion } from '@shared/types/version';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from '../guards/google-oauth.guard';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dtos/login.dto';


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
        
        const token = await this.authService.signIn(req.user as unknown as LoginUserDto);
        
        const clientSuccessUrl = this.configService.get<string>('CLIENTAUTHSUCCESSURL')!;
        
        res.cookie('access_token', token, {
            httpOnly: true,
        });

        return res.redirect(HttpStatus.PERMANENT_REDIRECT, clientSuccessUrl);
    }

    @Post('login')
    async login(@Body() body, @Res() res) {
        const { user } = body;
        try {
            const result = await this.authService.signIn(user);
            return res.status(HttpStatus.OK).json(result);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ Status: 'Failure', Details: error.message });
        }
    }

    @Post('register')
    async registerUser(@Body() body, @Res() res) {
        const { user } = body;
        try {
            const result = await this.authService.registerUser(user);
            return res.status(HttpStatus.OK).json(result);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ Status: 'Failure', Details: error.message });
        }   
    }
}
