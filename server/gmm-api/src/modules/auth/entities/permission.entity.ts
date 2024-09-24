import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryColumn()
  name: string;

  @Column()
  description: string;
}

export const allPermissions = {
  'user:write': 'Allow user to create/update any user',
  'user:read': 'Allow user to read any single user',
  'user:query': 'Allow user to query any user',
  'user:delete': 'Allow user to delete any user',

  'account_status:write':
    'Allow user to approve, ban or reject user registration',

  'role:write': 'Allow user to create/update role',
  'role:read': 'Allow user to read role',
  'role:delete': 'Allow user to delete role',

  'auth:reset_password': 'Allow user to reset password of any user',

  'matchmaking:write': 'Allow user to create/update matchmaking',
  'matchmaking:read': 'Allow user to read matchmaking',
  'matchmaking:delete': 'Allow user to delete matchmaking',

  'payment:write': 'Allow user to create/update payment',
  'payment:read': 'Allow user to read payment',
  'payment:delete': 'Allow user to delete payment',

  'match:consume': 'Allow user to consume match',
  'macth:read': 'Allow user to read match',

  'notification:write': 'Allow user to create/update notification',
  'notification:read': 'Allow user to read notification',
  
  'otp:write': 'Allow user to create/update otp',
  'otp:read': 'Allow user to read otp',

  'customers:read': 'Allow user to read customer',
  'products:read': 'Allow user to read product',

};

export type AppPermission = keyof typeof allPermissions;
