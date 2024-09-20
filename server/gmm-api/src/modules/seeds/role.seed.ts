import { allPermissions } from '@modules/auth/entities/permission.entity';
import { Role } from '@modules/auth/entities/role.entity';

const userRole = new Role();
userRole.name = 'User';
userRole.permissions = ['user:read'];

const adminRole = new Role();
adminRole.name = 'Admin';
adminRole.permissions = Object.keys(allPermissions);

export const roleSeed: Role[] = [userRole, adminRole];
