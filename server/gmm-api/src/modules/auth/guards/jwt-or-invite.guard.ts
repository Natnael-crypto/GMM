import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtOrInviteAuthGuard extends AuthGuard('jwt-or-invite') {}
