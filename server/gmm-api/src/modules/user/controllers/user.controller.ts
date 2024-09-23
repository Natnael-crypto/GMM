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
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Repository } from 'typeorm';
import {
  User,
  userFilterableFields,
  userSortableFields,
} from '../entities/user.entity';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { ExpectedIslamicLifestyleDto } from '../dtos/expected-islamic-lifestyle.dto';
import { UserService } from '../services/user.service';
import { StatusDto, UserDto } from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { UserIslamicLifestyleDto } from '../dtos/user-islamic-lifestyle.dto';
import { UserWorldlyLifestyleDto } from '../dtos/user-worldly-lifestyle.dto';
import { ExpectedWorldlyLifestyleDto } from '../dtos/expected-worldly-lifestyle.dto';
import { UserMarriageDiscussionDto } from '../dtos/user-marriage-discussion.dto';
import { UserOptionalVerifiableDto } from '../dtos/user-optional-verifiable.dto';
import { UserFamilyIntroductionDto } from '../dtos/user-family-introduction-dto';
import { PermissionGuard } from '@modules/auth/guards/permission.guard';
import { Sorting, SortingParams } from '@shared/decorators/sorting.decorator';
import {
  Pagination,
  PaginationParams,
} from '@shared/decorators/pagination.decorator';
import {
  Filtering,
  FilteringParams,
} from '@shared/decorators/filter.decorator';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: Request & { user: any }) {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('Invalid user');
    }
    const userId = req.user.id;
    const user = await this.userService.getUserById(userId);

    return {
      message: 'User retrieved successfully',
      data: user,
    };
  }

  @ApiQuery({
    name: 'filter',
    required: false,
    description: 'Filter parameters (e.g. filter=field:rule:value,field:rule)',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'Sorting parameters (e.g. sort=field:asc|desc)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination (defaults to 0)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page (defaults to 10)',
  })
  @UseGuards(JwtAuthGuard, new PermissionGuard(['user:query']))
  @Get()
  async getUsers(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(userSortableFields) sortingParams: Sorting,
    @FilteringParams(userFilterableFields)
    filteringParams: Filtering[],
  ) {
    try {
      const users = await this.userService.getUsers(
        paginationParams,
        sortingParams,
        filteringParams,
      );

      return users;
    } catch (e) {
      console.log(e);
      return { message: e.message, totalItems: 0, data: [], page: 0, limit: 0 };
    }
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['user:read']))
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
  async updateUser(@Param('id') id: string, @Body() userDto: Partial<UserDto>) {
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

    if (userDto.password) {
      userDto.password = await bcrypt.hash(userDto.password, 10);
    }

    this.userRepository.merge(user, userDto);
    await this.userRepository.save(user);

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
    return { message: 'User deleted successfully' };
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['user:read']))
  @Get(':id/worldly-lifestyle')
  async getWorldlyLifestyle(@Param('id') id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

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
    return {
      message: 'Worldly lifestyle updated successfully',
      data: updatedLifestyle,
    };
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['user:read']))
  @Get(':id/expected-worldly-lifestyle')
  async getExpectedWorldlyLifestyle(@Param('id') id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const expectedWorldlyLifestyle =
      await this.userService.getExpectedWorldlyLifestyle(id);
    if (!expectedWorldlyLifestyle) {
      throw new NotFoundException(
        'Expected worldly lifestyle information not found',
      );
    }

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
    return {
      message: 'Expected worldly lifestyle updated successfully',
      data: updatedLifestyle,
    };
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['user:read']))
  @Get(':id/islamic-lifestyle')
  async getIslamicLifestyle(@Param('id') id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const islamicLifestyle = await this.userService.getIslamicLifestyle(id);
    if (!islamicLifestyle) {
      throw new NotFoundException('Islamic lifestyle information not found');
    }

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
    return {
      message: 'Islamic lifestyle updated successfully',
      data: updatedLifestyle,
    };
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['user:read']))
  @Get(':id/expected-islamic-lifestyle')
  async getExpectedIslamicLifestyle(@Param('id') id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const expectedIslamicLifestyle =
      await this.userService.getExpectedIslamicLifestyle(id);
    if (!expectedIslamicLifestyle) {
      throw new NotFoundException(
        'Expected Islamic lifestyle information not found',
      );
    }

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
    return {
      message: 'Expected Islamic lifestyle updated successfully',
      data: updatedLifestyle,
    };
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['user:read']))
  @Get(':id/marriage-discussion')
  async getMarriageDiscussion(@Param('id') id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const marriageDiscussion = await this.userService.getMarriageDiscussion(id);
    if (!marriageDiscussion) {
      throw new NotFoundException(
        'User Marriage Discussion information not found',
      );
    }

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
    return {
      message: 'Marriage Discussion updated successfully',
      data: updatedDiscussion,
    };
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['user:read']))
  @Get(':id/optional-verifiable')
  async getOptionalVerifiable(@Param('id') id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const optionalVerifiable = await this.userService.getOptionalVerifiable(id);
    if (!optionalVerifiable) {
      throw new NotFoundException(
        'User Optional Verifiable information not found',
      );
    }

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
    return {
      message: 'User Optional Verifiable updated successfully',
      data: updatedVerifiable,
    };
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['user:read']))
  @Get(':id/family-introduction')
  async getFamilyIntroduction(@Param('id') id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const family = await this.userService.getFamilyIntroduction(id);
    if (!family) {
      throw new NotFoundException(
        'User Family Introduction information not found',
      );
    }

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
    const updatedFamily = await this.userService.updateFamilyIntroduction(
      id,
      updateDto,
    );
    return {
      message: 'User Family Introduction updated successfully',
      data: updatedFamily,
    };
  }
}
