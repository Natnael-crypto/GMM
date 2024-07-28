import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FacebookOauthGuard extends AuthGuard('facebook') {
    // async canActivate(context: ExecutionContext): Promise<boolean> {
    //     const activate = (await super.canActivate(context)) as boolean;
    //     const request = context.switchToHttp().getRequest();
    //     await super.logIn(request);
    //     return activate;
    // }
}
