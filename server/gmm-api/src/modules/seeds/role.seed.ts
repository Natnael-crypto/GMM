import { Role } from '@modules/auth/entities/role.entity';

const userRole = new Role();
userRole.name = 'User';
userRole.permissions = ['user:read'];

const adminRole = new Role();
adminRole.name = 'Admin';
adminRole.permissions = [
  'user:read',
  'user:write',
  'user:delete',
  'user:approve',
  'role:read',
  'role:write',
  'role:delete',
  'auth:reset_password',
  'matchmaking:read',
  'matchmaking:write',
  'matchmaking:delete',
];

export const roleSeed: Role[] = [userRole, adminRole];
