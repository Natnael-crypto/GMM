import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto } from '../dtos/role.dto';
import { UserService } from '@modules/user/services/user.service';
import { defaultRoles } from '@shared/database/seeds/permission.seed';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly userService: UserService,
  ) {}

  async createRole(role: CreateRoleDto) {
    const newRole = this.roleRepository.create(role);
    try {
      return await this.roleRepository.insert(newRole);
    } catch (e) {
      throw new ConflictException('Role already exists');
    }
  }

  async updateRole(name: string, updatedRole: UpdateRoleDto) {
    if (defaultRoles.includes(name)) {
      throw new ConflictException('Cannot update default roles');
    }

    const role = await this.roleRepository.findOne({ where: { name } });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    try {
      await this.roleRepository.update({ name }, updatedRole);
    } catch (e) {
      throw new ConflictException(
        'Updated role name conflicts with existing role',
      );
    }
  }

  async getRoles() {
    return await this.roleRepository.find();
  }

  async get(name: string) {
    const role = await this.roleRepository.findOne({ where: { name } });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async deleteRole(name: string) {
    if (defaultRoles.includes(name)) {
      throw new ConflictException('Cannot delete default roles');
    }

    await this.roleRepository.delete({ name });
  }

  async assignRole(userId: string, roleId: string) {
    const user = await this.userService.getUserById(userId);
    const role = await this.get(roleId);

    user.role = role;

    return await this.userService.updateUser(user);
  }
}
