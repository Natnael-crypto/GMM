import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  NotFoundException,
  UnauthorizedException,
  Post,
  UnprocessableEntityException,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { ExpectedIslamicLifestyleDto } from '../dtos/expected-islamic-lifestyle.dto';
import { UserService } from '../services/user.service';
import { StatusDto, UserDto } from '../dtos/user.dto';
import { UserIslamicLifestyleDto } from '../dtos/user-islamic-lifestyle.dto';
import { UserWorldlyLifestyleDto } from '../dtos/user-worldly-lifestyle.dto';
import { ExpectedWorldlyLifestyleDto } from '../dtos/expected-worldly-lifestyle.dto';
import { UserMarriageDiscussionDto } from '../dtos/user-marriage-discussion.dto';
import { UserOptionalVerifiableDto } from '../dtos/user-optional-verifiable.dto';
import { UserFamilyIntroductionDto } from '../dtos/user-family-introduction-dto';
import { PermissionGuard } from '@modules/auth/guards/permission.guard';
import { ExpressRegistrationDto } from '../dtos/express-registration';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserSpecificCacheInterceptor } from '@shared/interceptors/cache.interceptor';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@ApiTags('User')  
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UserSpecificCacheInterceptor)
  @Get('me')
  async getMe(@Req() req: Request & { user: any }) {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('Invalid user');
    }

    const userId = req.user.id;
    const user = await this.userService.getUserById(userId);
    const isMatched = await this.userService.isUserMatched(userId);

    return {
      message: 'User retrieved successfully',
      data: { ...user, isMatched },
    };
  }

  @UseGuards(
    JwtAuthGuard,
    new PermissionGuard(['user:write'], (req) => req.user.id === req.params.id),
  )
  @Post(':id')
  async expressRegistration(
    @Body() registrationDto: ExpressRegistrationDto,
    @Param('id') id: string,
  ) {
    try {
      const result = await this.userService.expressRegistration(
        id,
        registrationDto,
      );
      return {
        message: 'User registration updated successfully',
        data: result[0],
      };
    } catch (e) {
      throw new UnprocessableEntityException(e.message);
    }
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['user:read']))
  @UseInterceptors(CacheInterceptor)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const userExists = await this.userRepository.findOne({ where: { id } });
    if (!userExists) {
      throw new NotFoundException('User not found');
    }
    const user = userExists;
    return {
      message: 'User retrieved successfully',
      data: user,
    };
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['account_status:write']))
  @Put(':id/account-status')
  async updateAccountStatus(@Param('id') id: string, @Body() dto: StatusDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.accountStatus = dto.status;
    await this.userRepository.save(user);

    const keys = [
      `/users/${id}`,
      `/users/me/${id}`,
    ]
    await Promise.all(keys.map(key => this.cacheManager.del(key)));

    return {
      message: 'User account status updated successfully',
      data: user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UserDto, required: false })
  @UseGuards(
    JwtAuthGuard,
    new PermissionGuard(['user:write'], (req) => req.user.id === req.params.id),
  )
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // check if email already exists
    if (userDto.email) {
      const emailExists = await this.userRepository.findOne({
        where: { email: userDto.email },
      });
      if (emailExists && emailExists.id !== id) {
        throw new UnauthorizedException('Email already exists');
      }
    }

    this.userRepository.merge(user, userDto);
    await this.userRepository.save(user);

    const keys = [
      `/users/${id}`,
      `/users/me/${id}`,
    ]
    await Promise.all(keys.map(key => this.cacheManager.del(key)));

    return {
      message: 'User updated successfully',
      data: user,
    };
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['user:delete']))
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);

    const keys = [`/users/${id}`,
                  `/users/me/${id}`,
                  `/users/${id}/worldly-lifestyle`,
                  `/users/${id}/expected-worldly-lifestyle`,
                  `/users/${id}/islamic-lifestyle`,
                  `/users/${id}/expected-islamic-lifestyle`,
                  `/users/${id}/marriage-discussion`,
                  `/users/${id}/optional-verifiable`,
                  `/users/${id}/family-introduction`
                ];

    await Promise.all(keys.map(key => this.cacheManager.del(key)));

    return { message: 'User deleted successfully' };
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['user:read']))
  @UseInterceptors(CacheInterceptor)
  @Get(':id/worldly-lifestyle')
  async getWorldlyLifestyle(@Param('id') id: string) {
    const worldlyLifestyle = await this.userService.getWorldlyLifestyle(id);
    if (!worldlyLifestyle) {
      throw new NotFoundException('Worldly lifestyle information not found');
    }

    return {
      message: 'Worldly lifestyle retrieved successfully',
      data: worldlyLifestyle,
    };
  }

  @UseGuards(
    JwtAuthGuard,
    new PermissionGuard(['user:write'], (req) => req.user.id === req.params.id),
  )
  @Put(':id/worldly-lifestyle')
  async updateWorldlyLifestyle(
    @Param('id') id: string,
    @Body() updateDto: UserWorldlyLifestyleDto,
  ) {
    const updatedLifestyle = await this.userService.updateWorldlyLifestyle(
      id,
      updateDto,
    );

    const cacheKey = `/users/${id}/worldly-lifestyle`;
    await this.cacheManager.del(cacheKey);

    return {
      message: 'Worldly lifestyle updated successfully',
      data: updatedLifestyle,
    };
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['user:read']))
  @UseInterceptors(CacheInterceptor)
  @Get(':id/expected-worldly-lifestyle')
  async getExpectedWorldlyLifestyle(@Param('id') id: string) {
    const expectedWorldlyLifestyle =
      await this.userService.getExpectedWorldlyLifestyle(id);

    return {
      message: 'Expected worldly lifestyle retrieved successfully',
      data: expectedWorldlyLifestyle,
    };
  }

  @UseGuards(
    JwtAuthGuard,
    new PermissionGuard(['user:write'], (req) => req.user.id === req.params.id),
  )
  @Put(':id/expected-worldly-lifestyle')
  async updateExpectedWorldlyLifestyle(
    @Param('id') id: string,
    @Body() updateDto: ExpectedWorldlyLifestyleDto,
  ) {
    const updatedLifestyle =
      await this.userService.updateExpectedWorldlyLifestyle(id, updateDto);

    const cacheKey = `/users/${id}/expected-worldly-lifestyle`;
    await this.cacheManager.del(cacheKey);

    return {
      message: 'Expected worldly lifestyle updated successfully',
      data: updatedLifestyle,
    };
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['user:read']))
  @UseInterceptors(CacheInterceptor)
  @Get(':id/islamic-lifestyle')
  async getIslamicLifestyle(@Param('id') id: string) {
    const islamicLifestyle = await this.userService.getIslamicLifestyle(id);

    return {
      message: 'Islamic lifestyle retrieved successfully',
      data: islamicLifestyle,
    };
  }

  @UseGuards(
    JwtAuthGuard,
    new PermissionGuard(['user:write'], (req) => req.user.id === req.params.id),
  )
  @Put(':id/islamic-lifestyle')
  async updateIslamicLifestyle(
    @Param('id') id: string,
    @Body() updateDto: UserIslamicLifestyleDto,
  ) {
    const updatedLifestyle = await this.userService.updateIslamicLifestyle(
      id,
      updateDto,
    );

    const cacheKey = `/users/${id}/islamic-lifestyle`;
    await this.cacheManager.del(cacheKey);

    return {
      message: 'Islamic lifestyle updated successfully',
      data: updatedLifestyle,
    };
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['user:read']))
  @UseInterceptors(CacheInterceptor)
  @Get(':id/expected-islamic-lifestyle')
  async getExpectedIslamicLifestyle(@Param('id') id: string) {
    const expectedIslamicLifestyle =
      await this.userService.getExpectedIslamicLifestyle(id);

    return {
      message: 'Expected Islamic lifestyle retrieved successfully',
      data: expectedIslamicLifestyle,
    };
  }

  @UseGuards(
    JwtAuthGuard,
    new PermissionGuard(['user:write'], (req) => req.user.id === req.params.id),
  )
  @Put(':id/expected-islamic-lifestyle')
  async updateExpectedIslamicLifestyle(
    @Param('id') id: string,
    @Body() updateDto: ExpectedIslamicLifestyleDto,
  ) {
    const updatedLifestyle =
      await this.userService.updateExpectedIslamicLifestyle(id, updateDto);

    const cacheKey = `/users/${id}/expected-islamic-lifestyle`;
    await this.cacheManager.del(cacheKey);

    return {
      message: 'Expected Islamic lifestyle updated successfully',
      data: updatedLifestyle,
    };
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['user:read']))
  @UseInterceptors(CacheInterceptor)
  @Get(':id/marriage-discussion')
  async getMarriageDiscussion(@Param('id') id: string) {
    const marriageDiscussion = await this.userService.getMarriageDiscussion(id);

    return {
      message: 'Marriage Discussion retrieved successfully',
      data: marriageDiscussion,
    };
  }

  @UseGuards(
    JwtAuthGuard,
    new PermissionGuard(['user:write'], (req) => req.user.id === req.params.id),
  )
  @Put(':id/marriage-discussion')
  async updateMarriageDiscussion(
    @Param('id') id: string,
    @Body() updateDto: UserMarriageDiscussionDto,
  ) {
    const updatedDiscussion = await this.userService.updateMarriageDiscussion(
      id,
      updateDto,
    );

    const cacheKey = `/users/${id}/marriage-discussion`;
    await this.cacheManager.del(cacheKey);

    return {
      message: 'Marriage Discussion updated successfully',
      data: updatedDiscussion,
    };
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['user:read']))
  @UseInterceptors(CacheInterceptor)
  @Get(':id/optional-verifiable')
  async getOptionalVerifiable(@Param('id') id: string) {
    const optionalVerifiable = await this.userService.getOptionalVerifiable(id);

    return {
      message: 'User Optional Verifiable retrieved successfully',
      data: optionalVerifiable,
    };
  }

  @UseGuards(
    JwtAuthGuard,
    new PermissionGuard(['user:write'], (req) => req.user.id === req.params.id),
  )
  @Put(':id/optional-verifiable')
  async updateOptionalVerifiable(
    @Param('id') id: string,
    @Body() updateDto: UserOptionalVerifiableDto,
  ) {
    const updatedVerifiable = await this.userService.updateOptionalVerifiable(
      id,
      updateDto,
    );

    const cacheKey = `/users/${id}/optional-verifiable`;
    await this.cacheManager.del(cacheKey);

    return {
      message: 'User Optional Verifiable updated successfully',
      data: updatedVerifiable,
    };
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['user:read']))
  @UseInterceptors(CacheInterceptor)
  @Get(':id/family-introduction')
  async getFamilyIntroduction(@Param('id') id: string) {
    const family = await this.userService.getFamilyInformation(id);

    return {
      message: 'User Family Introduction retrieved successfully',
      data: family,
    };
  }

  @UseGuards(
    JwtAuthGuard,
    new PermissionGuard(['user:write'], (req) => req.user.id === req.params.id),
  )
  @Put(':id/family-introduction')
  async updateFamilyIntroduction(
    @Param('id') id: string,
    @Body() updateDto: UserFamilyIntroductionDto,
  ) {
    const updatedFamily = await this.userService.updateFamilyInformation(
      id,
      updateDto,
    );

    const cacheKey = `/users/${id}/family-introduction`;
    await this.cacheManager.del(cacheKey);

    return {
      message: 'User Family Introduction updated successfully',
      data: updatedFamily,
    };
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['user:read']))
  @Delete(':id/cache')
  async invalidateUserCache(@Param('id') id: string) {
    const keys = [
      `/users/${id}`,
      `/users/me/${id}`,
    ];

    await Promise.all(keys.map(key => this.cacheManager.del(key)));

    return { message: 'User cache invalidated successfully' };
  }
}
