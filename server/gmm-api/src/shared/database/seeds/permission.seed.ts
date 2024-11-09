import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Permission } from '@modules/auth/entities/permission.entity';
import { Role } from '@modules/auth/entities/role.entity';

export const allPermissions: string[] = [];
export const defaultRoles: string[] = [];

export const userRole = new Role();
userRole.name = 'User';
userRole.permissions = ['user:read'];

export const adminRole = new Role();
adminRole.name = 'Admin';
adminRole.permissions = Object.keys(allPermissions);

export const guardianRole = new Role();
guardianRole.name = 'Guardian';
userRole.permissions = ['user:read'];

export default class PermissionSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    // Permissions
    const repository = dataSource.getRepository(Permission);
    await repository.upsert(
      [
        {
          name: 'user:write',
          description: 'Allow user to create/update any user',
        },
        {
          name: 'user:read',
          description: 'Allow user to read any single user',
        },
        {
          name: 'user:query',
          description: 'Allow user to query any user',
        },
        {
          name: 'user:delete',
          description: 'Allow user to delete any user',
        },
        {
          name: 'account_status:write',
          description: 'Allow user to approve, ban or reject user registration',
        },
        {
          name: 'role:write',
          description: 'Allow user to create/update role',
        },
        {
          name: 'role:read',
          description: 'Allow user to read role',
        },
        {
          name: 'role:delete',
          description: 'Allow user to delete role',
        },
        {
          name: 'auth:reset_password',
          description: 'Allow user to reset password of any user',
        },
        {
          name: 'matchmaking:write',
          description: 'Allow user to create/update matchmaking',
        },
        {
          name: 'matchmaking:read',
          description: 'Allow user to read matchmaking',
        },
        {
          name: 'matchmaking:delete',
          description: 'Allow user to delete matchmaking',
        },
        {
          name: 'payment:write',
          description: 'Allow user to create/update payment',
        },
        {
          name: 'payment:read',
          description: 'Allow user to read payment',
        },
        {
          name: 'payment:delete',
          description: 'Allow user to delete payment',
        },
        {
          name: 'match:consume',
          description: 'Allow user to consume match',
        },
        {
          name: 'match:read',
          description: 'Allow user to read match',
        },
        {
          name: 'notification:write',
          description: 'Allow user to create/update notification',
        },
        {
          name: 'notification:read',
          description: 'Allow user to read notification',
        },
        {
          name: 'otp:write',
          description: 'Allow user to create/update otp',
        },
        {
          name: 'otp:read',
          description: 'Allow user to read otp',
        },
        {
          name: 'customers:read',
          description: 'Allow user to read customer',
        },
        {
          name: 'products:read',
          description: 'Allow user to read product',
        },
        {
          name: 'products:update',
          description: 'Allow user to update product',
        },
      ],
      ['name'],
    );

    // Roles
    const roleRepository = dataSource.getRepository(Role);
    await roleRepository.upsert(
      [
        {
          name: 'User',
          permissions: ['user:read'],
        },
        {
          name: 'Admin',
          permissions: [
            'user:write',
            'user:read',
            'user:query',
            'user:delete',
            'account_status:write',
            'role:write',
            'role:read',
            'role:delete',
            'auth:reset_password',
            'matchmaking:write',
            'matchmaking:read',
            'matchmaking:delete',
            'payment:write',
            'payment:read',
            'payment:delete',
            'match:consume',
            'match:read',
            'notification:write',
            'notification:read',
            'otp:write',
            'otp:read',
            'customers:read',
            'products:read',
            'products:update',
          ],
        },
        {
          name: 'Guardian',
          permissions: ['user:read'],
        },
      ],
      ['name'],
    );
  }
}
