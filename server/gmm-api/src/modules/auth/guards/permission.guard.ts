import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import type { AppPermission } from '../entities/permission.entity';
import type { User } from '@modules/user/entities/user.entity';
import { Request } from 'express';

export type BypassFunction = (
  req: Request & { user: User },
) => Promise<boolean> | boolean;

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly requirePermission: AppPermission[],
    private readonly bypassIf: BypassFunction = () => false,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      return false;
    }

    const user: User = request.user;

    if (!user.role.permissions) {
      return false;
    }

    const missingPermissions = this.requirePermission.filter(
      (permission) => !user.role.permissions.includes(permission),
    );

    let allow = missingPermissions.length === 0;

    allow = allow || (await this.bypassIf(request));

    if (!allow) {
      throw new ForbiddenException({
        message: 'You do not have permission to access this resource.',
        missingPermissions,
        action: request.method + ' ' + request.url,
      });
    }

    return allow;
  }
}
