



import { User } from '@modules/user/entities/user.entity';
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
import { CreateUserDto } from '../dtos/create-user.dto';



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
        
        const token = await this.authService.signIn(req.user as unknown as User);
        
        const clientSuccessUrl = this.configService.get<string>('CLIENTAUTHSUCCESSURL')!;
        
        res.cookie('access_token', token, {
            httpOnly: true,
        });

        return res.redirect(HttpStatus.PERMANENT_REDIRECT, clientSuccessUrl);
    }

    @Post('send-otp')
    @ApiBody({
        schema: {
        type: 'object',
        properties: {
            email: { type: 'string' },
            password: { type: 'string' },
            firstname: { type: 'string' },
            lastname: { type: 'string' },
            confirmPassword: { type: 'string' }
        },
        },
    })
    async sendOtp(@Body() createUserDto: CreateUserDto): Promise<void> {
        await this.authService.sendOtpForSignIn(createUserDto);
    }
}
