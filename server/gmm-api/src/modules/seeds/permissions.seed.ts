import {
  allPermissions,
  Permission,
} from '@modules/auth/entities/permission.entity';

export const permissionSeed: Permission[] = [];

for (const permission in allPermissions) {
  permissionSeed.push({
    name: permission,
    description: allPermissions[permission],
  });
}
