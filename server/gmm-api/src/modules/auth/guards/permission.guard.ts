import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import type { AppPermission } from '../entities/permission.entity';
import type { User } from '@modules/user/entities/user.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly requirePermission: AppPermission[]) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      return false;
    }

    const user: User = request.user;

    if (!user.role.permissions) {
      return false;
    }

    const allow = this.requirePermission.every((permission) =>
      user.role.permissions.includes(permission),
    );

    if (!allow) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return allow;
  }
}
