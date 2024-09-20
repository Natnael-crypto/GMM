import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
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

@ApiTags('Self Account')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class SelfAccountController {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

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

  @ApiBody({ type: UserDto, required: false })
  @Put('me')
  async updateSelf(
    @Body() userDto: Partial<UserDto>,
    @Req() req: Request & { user: any },
  ) {
    const user = req.user;
    const id = user.id;

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

  @Put('worldly-lifestyle')
  async updateSelfWorldlyLifestyle(
    @Body() updateDto: UserWorldlyLifestyleDto,
    @Req() req: Request & { user: any },
  ) {
    const updatedLifestyle = await this.userService.updateWorldlyLifestyle(
      req.user.id,
      updateDto,
    );
    return {
      message: 'Worldly lifestyle updated successfully',
      data: updatedLifestyle,
    };
  }

  @Put('expected-worldly-lifestyle')
  async updateSelfExpectedWorldlyLifestyle(
    @Body() updateDto: ExpectedWorldlyLifestyleDto,
    @Req() req: Request & { user: any },
  ) {
    const updatedLifestyle =
      await this.userService.updateExpectedWorldlyLifestyle(
        req.user.id,
        updateDto,
      );
    return {
      message: 'Expected worldly lifestyle updated successfully',
      data: updatedLifestyle,
    };
  }

  @Put('islamic-lifestyle')
  async updateSelfIslamicLifestyle(
    @Body() updateDto: UserIslamicLifestyleDto,
    @Req() req: Request & { user: any },
  ) {
    const updatedLifestyle = await this.userService.updateIslamicLifestyle(
      req.user.id,
      updateDto,
    );
    return {
      message: 'Islamic lifestyle updated successfully',
      data: updatedLifestyle,
    };
  }

  @Put('expected-islamic-lifestyle')
  async updateSelfExpectedIslamicLifestyle(
    @Body() updateDto: ExpectedIslamicLifestyleDto,
    @Req() req: Request & { user: any },
  ) {
    const updatedLifestyle =
      await this.userService.updateExpectedIslamicLifestyle(
        req.user.id,
        updateDto,
      );
    return {
      message: 'Expected Islamic lifestyle updated successfully',
      data: updatedLifestyle,
    };
  }

  @Put('marriage-discussion')
  async updateSelfMarriageDiscussion(
    @Body() updateDto: UserMarriageDiscussionDto,
    @Req() req: Request & { user: any },
  ) {
    const updatedDiscussion = await this.userService.updateMarriageDiscussion(
      req.user.id,
      updateDto,
    );
    return {
      message: 'Marriage Discussion updated successfully',
      data: updatedDiscussion,
    };
  }

  @Put('optional-verifiable')
  async updateSelfOptionalVerifiable(
    @Body() updateDto: UserOptionalVerifiableDto,
    @Req() req: Request & { user: any },
  ) {
    const updatedVerifiable = await this.userService.updateOptionalVerifiable(
      req.user.id,
      updateDto,
    );
    return {
      message: 'User Optional Verifiable updated successfully',
      data: updatedVerifiable,
    };
  }

  @Put('family-introduction')
  async updateSelfFamilyIntroduction(
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
