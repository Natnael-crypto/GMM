import {
    Injectable,
    ExecutionContext,
  } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
  
  
@Injectable()
export class UserSpecificCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.id) {
      return `${request.url}/${user.id}`;
    }

    // Explicitly disable caching for requests without a user ID
    return undefined;
  }
}

  