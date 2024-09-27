import { allPermissions } from '@modules/auth/entities/permission.entity';
import { Role } from '@modules/auth/entities/role.entity';

export const userRole = new Role();
userRole.name = 'User';
userRole.permissions = ['user:read'];

export const adminRole = new Role();
adminRole.name = 'Admin';
adminRole.permissions = Object.keys(allPermissions);

export const guardianRole = new Role();
guardianRole.name = 'Guardian';
userRole.permissions = ['user:read'];

export const roleSeed: Role[] = [userRole, adminRole, guardianRole];
