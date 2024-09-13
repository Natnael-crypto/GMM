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
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { ExpectedIslamicLifestyleDto } from '../dtos/expected-islamic-lifestyle.dto';
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { UserIslamicLifestyleDto } from '../dtos/user-islamic-lifestyle.dto';
import { UserWorldlyLifestyleDto } from '../dtos/user-worldly-lifestyle.dto';
import { ExpectedWorldlyLifestyleDto } from '../dtos/expected-worldly-lifestyle.dto';
import { UserMarriageDiscussionDto } from '../dtos/user-marriage-discussion.dto';
import { UserOptionalVerifiableDto } from '../dtos/user-optional-verifiable.dto';
import { UserFamilyIntroductionDto } from '../dtos/user-family-introduction-dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiQuery({ name: 'email', required: false })
  async getUsers(@Query('email') email: string) {
    if (email) {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return {
        message: 'User retrieved successfully',
        data: user,
      };
    }

    const users = await this.userRepository.find();

    return {
      message: 'Users retrieved successfully',
      data: users,
    };
  }

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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBody({ type: UserDto, required: false })
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
    return { message: 'User deleted successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/worldy-lifestyle')
  async getWorldlyLifestyle(@Param('id') id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const worldyLifestyle = await this.userService.getWorldyLifestyle(id);
    if (!worldyLifestyle) {
      throw new NotFoundException('Worldly lifestyle information not found');
    }

    return {
      message: 'Worldly lifestyle retrieved successfully',
      data: worldyLifestyle,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/worldy-lifestyle')
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

  @UseGuards(JwtAuthGuard)
  @Get(':id/expected-worldy-lifestyle')
  async getExpectedWorldlyLifestyle(@Param('id') id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const expectedWorldyLifestyle =
      await this.userService.getExpectedWorldyLifestyle(id);
    if (!expectedWorldyLifestyle) {
      throw new NotFoundException(
        'Expected worldly lifestyle information not found',
      );
    }

    return {
      message: 'Expected worldly lifestyle retrieved successfully',
      data: expectedWorldyLifestyle,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/expected-worldy-lifestyle')
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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
