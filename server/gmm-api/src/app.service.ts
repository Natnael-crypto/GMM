import { Permission } from '@modules/auth/entities/permission.entity';
import { Role } from '@modules/auth/entities/role.entity';
import { permissionSeed } from '@modules/seeds/permissions.seed';
import { roleSeed } from '@modules/seeds/role.seed';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EntityManager } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly configService: ConfigService,
  ) {}

  getHello(): string {
    return `GMM running smooth! (${this.configService.get<string>('env')} mode)`;
  }

  async seed(): Promise<void> {
    await Promise.all([
      this.entityManager.save(Permission, permissionSeed),
      this.entityManager.save(Role, roleSeed),
    ]);
  }
}
