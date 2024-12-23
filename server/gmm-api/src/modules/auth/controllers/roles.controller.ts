import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PermissionGuard } from '../guards/permission.guard';
import { ApiVersion } from '@shared/types/version';
import { RoleService } from '../services/role.service';
import {
  AssignUserRoleDto,
  CreateRoleDto,
  UpdateRoleDto,
} from '../dtos/role.dto';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@ApiTags('roles')
@ApiBearerAuth()
@UseInterceptors(CacheInterceptor)
@Controller({ version: ApiVersion.V1 })
export class RoleController {
  constructor(
    private roleService: RoleService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @ApiBody({ type: CreateRoleDto })
  @UseGuards(JwtAuthGuard, new PermissionGuard(['role:write']))
  @Post('roles')
  async createRole(@Body() role: CreateRoleDto) {
    const result = await this.roleService.createRole(role);
    
    const key = `/roles`;
    await this.cacheManager.del(key);

    return {
      message: 'Role created successfully',
      role: result,
    };
  }

  @ApiBody({ type: UpdateRoleDto })
  @UseGuards(JwtAuthGuard, new PermissionGuard(['role:write']))
  @Put('roles/:name')
  async updateRole(@Param('name') name: string, @Body() role: UpdateRoleDto) {
    const result = await this.roleService.updateRole(name, role);

    const key = `/roles`;
    await this.cacheManager.del(key);

    return {
      message: 'Role updated successfully',
      role: result
    };
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['role:read']))
  @Get('roles')
  async getRoles() {
    return await this.roleService.getRoles();
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['role:delete']))
  @Delete('roles/:name')
  async deleteRole(@Param('name') name: string) {
    const result = await this.roleService.deleteRole(name);

    const key = `/roles`;
    await this.cacheManager.del(key);

    return {
      message: 'Role deleted successfully',
      role: result,
    }
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['user:write']))
  @Put('users/:userId/roles')
  async assignRole(
    @Param('userId') userId: string,
    @Body() role: AssignUserRoleDto,
  ) {
    const user = await this.roleService.assignRole(userId, role.roleId);

    const keys = [
      `/users/${userId}`,
      `/users/me/${userId}`,
    ];

    await Promise.all(
      keys.map((key) => this.cacheManager.del(key)),
    );

    return {
      message: 'User role updated successfully',
      user,
    };
  }
}
