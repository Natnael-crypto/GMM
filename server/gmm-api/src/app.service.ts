import { Permission } from '@modules/auth/entities/permission.entity';
import { Role } from '@modules/auth/entities/role.entity';
import { permissionSeed } from '@modules/seeds/permissions.seed';
import { roleSeed } from '@modules/seeds/role.seed';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private readonly entityManager: EntityManager) {}

  getHello(): string {
    return 'GMM running smooth!';
  }

  async seed(): Promise<void> {
    await Promise.all([
      this.entityManager.save(Permission, permissionSeed),
      this.entityManager.save(Role, roleSeed),
    ]);
  }
}
