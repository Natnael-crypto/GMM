import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { EMAIL_LISTS_ID } from '../user.module';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { UserDto } from '../dtos/user.dto';
import { HusbandExpectedIslamicLifestyleModel } from '../entities/husband-expected-islamic-lifestyle.schema';
import { ExpectedIslamicLifestyleDto } from '../dtos/expected-islamic-lifestyle.dto';
import { UserWorldlyLifestyleModel } from '../entities/user-worldly-lifestyle.schema';
import { HusbandIslamicLifestyleModel } from '../entities/husband-islamic-lifestyle.schema';
import { UserIslamicLifestyleDto } from '../dtos/user-islamic-lifestyle.dto';
import { UserWorldlyLifestyleDto } from '../dtos/user-worldly-lifestyle.dto';
import { HusbandExpectedWorldlyLifestyleModel } from '../entities/husband-expected-worldly-lifestyle.schema';
import { WifeExpectedWorldlyLifestyleModel } from '../entities/wife-expected-worldly-lifestyle.schema';
import { ExpectedWorldlyLifestyleDto } from '../dtos/expected-worldly-lifestyle.dto';
import { UserMarriageDiscussionModel } from '../entities/user-marriage-discussion.schema';
import { UserMarriageDiscussionDto } from '../dtos/user-marriage-discussion.dto';
import { UserOptionalVerifiableModel } from '../entities/user-optional-verifiable.schema';
import { UserOptionalVerifiableDto } from '../dtos/user-optional-verifiable.dto';
import { UserFamilyIntroductionModel } from '../entities/user-family-introduction.schema';
import { UserFamilyIntroductionDto } from '../dtos/user-family-introduction-dto';
import { NoticeService } from '@modules/notice/services/notice.service';
import { Pagination } from '@shared/decorators/pagination.decorator';
import { Sorting } from '@shared/decorators/sorting.decorator';
import { Filtering } from '@shared/decorators/filter.decorator';
import { getWhere, getOrder } from '@shared/decorators/filter.helper';
import { ExpressRegistrationDto } from '../dtos/express-registration';
import { GuardianService } from '../services/guardian.service';
import { WifeIslamicLifestyleModel } from '../entities/wife-islamic-lifestyle.schema';
import { WifeExpectedIslamicLifestyleModel } from '../entities/wife-expected-islamic-lifestyle.schema';
import { BaseRepository } from '@shared/base-repository';
import { DataSource, Or } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { AccountStatus } from '../enums/user.enum';
import { Match } from '@modules/matchmaking/entities/match.entity';

@Injectable({ scope: Scope.REQUEST })
export class UserService extends BaseRepository {
  constructor(
    private readonly noticeService: NoticeService,
    private readonly guardianService: GuardianService,
    @Inject(REQUEST) req: Request,
    dataSource: DataSource,
  ) {
    super(dataSource, req);
  }

  async getUsers(
    { page, limit, offset }: Pagination,
    sort?: Sorting,
    filter?: Filtering[],
  ) {
    const where = getWhere(filter);
    const order = getOrder(sort);

    const [users, total] = await this.getRepository(User).findAndCount({
      where,
      order,
      take: limit,
      skip: offset,
    });

    return {
      totalItems: total,
      data: users,
      page,
      limit,
    };
  }

  async findAll() {
    const users = await this.getRepository(User).find();
    return Promise.all(
      users.map(async (user) => {
        const { password, ...userWithoutPassword } = user;
        let worldlyLifestyle;
        let islamicLifestyle;

        try {
          worldlyLifestyle = await this.getWorldlyLifestyle(user.id);
        } catch (error) {}

        try {
          islamicLifestyle = await this.getIslamicLifestyle(user.id);
        } catch (error) {}

        return {
          ...userWithoutPassword,
          profession: worldlyLifestyle?.currentOccupationTitle,
          education: worldlyLifestyle?.education,
          salat: islamicLifestyle?.salat,
          hijab: islamicLifestyle?.hijab,
        };
      }),
    );
  }

  async getUserById(id: string) {
    if (!id) {
      throw new NotFoundException('User ID is required');
    }

    try {
      const user = await this.getRepository(User).findOne({
        where: { id },
        relations: ['guardian'],
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async create(createUserDto: UserDto) {
    return this.getRepository(User).save({
      ...createUserDto,
      createdAt: new Date(),
    });
  }

  async isUserMatched(userId: string) {
    const match = await this.getRepository(Match).findOne({
      where: [
        { maleUserId: userId, isActive: true },
        { femaleUserId: userId, isActive: true },
      ],
    });

    return !!match;
  }

  async expressRegistration(userId: string, dto: ExpressRegistrationDto) {
    const user = await this.getRepository(User).findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = Object.assign(user, dto);
    updatedUser.accountStatus = AccountStatus.PENDING;

    return await Promise.all([
      this.getRepository(User).save(updatedUser),

      this.updateFamilyIntroduction(userId, {
        guardianEmail: dto.guardianEmail,
        guardianFirstName: dto.guardianFirstName,
        guardianLastName: dto.guardianLastName,
        guardianPhoneNumber: dto.guardianPhoneNumber,
        relationshipToGuardian: dto.relationshipToGuardian,
      }),

      this.guardianService.requestGuardian(user, {
        guardianEmail: dto.guardianEmail,
        relationshipToGuardian: dto.relationshipToGuardian,
      }),
    ]);
  }

  async updateUser(user: User) {
    return await this.getRepository(User).save(user);
  }

  async getWorldlyLifestyle(userId: string) {
    const user = await this.getRepository(User).findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const lifestyle = await UserWorldlyLifestyleModel.get(userId);

    if (!lifestyle) {
      throw new NotFoundException('Worldly lifestyle information not found');
    }

    return lifestyle;
  }

  async updateWorldlyLifestyle(
    userId: string,
    updateDto: UserWorldlyLifestyleDto,
  ) {
    const user = await this.getRepository(User).findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let lifestyle = await UserWorldlyLifestyleModel.get(userId);
    if (!lifestyle) {
      lifestyle = new UserWorldlyLifestyleModel({ id: userId });
    }

    Object.assign(lifestyle, updateDto);
    await lifestyle.save();

    return lifestyle;
  }

  async getExpectedWorldlyLifestyle(userId: string) {
    const user = await this.getRepository(User).findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let lifestyle;
    if (user.gender === 'Male') {
      lifestyle = await HusbandExpectedWorldlyLifestyleModel.get(userId);
    } else {
      lifestyle = await WifeExpectedWorldlyLifestyleModel.get(userId);
    }

    if (!lifestyle) {
      throw new NotFoundException(
        'Expected worldly lifestyle information not found',
      );
    }

    return lifestyle;
  }

  async updateExpectedWorldlyLifestyle(
    userId: string,
    updateDto: ExpectedWorldlyLifestyleDto,
  ) {
    const user = await this.getRepository(User).findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let lifestyle;
    if (user.gender === 'Male') {
      lifestyle = await HusbandExpectedWorldlyLifestyleModel.get(userId);
      if (!lifestyle) {
        lifestyle = new HusbandExpectedWorldlyLifestyleModel({ id: userId });
      }
    } else {
      lifestyle = await WifeExpectedWorldlyLifestyleModel.get(userId);
      if (!lifestyle) {
        lifestyle = new WifeExpectedWorldlyLifestyleModel({ id: userId });
      }
    }

    Object.assign(lifestyle, updateDto);
    await lifestyle.save();

    return lifestyle;
  }

  async getIslamicLifestyle(userId: string) {
    const user = await this.getRepository(User).findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let lifestyle;
    if (user.gender === 'Male') {
      lifestyle = await HusbandIslamicLifestyleModel.get(userId);
    } else {
      lifestyle = await WifeIslamicLifestyleModel.get(userId);
    }

    if (!lifestyle) {
      throw new NotFoundException('Islamic lifestyle information not found');
    }

    return lifestyle;
  }

  async updateIslamicLifestyle(
    userId: string,
    updateDto: UserIslamicLifestyleDto,
  ) {
    const user = await this.getRepository(User).findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let lifestyle;
    if (user.gender === 'Male') {
      lifestyle = await HusbandIslamicLifestyleModel.get(userId);
      if (!lifestyle) {
        lifestyle = new HusbandIslamicLifestyleModel({ id: userId });
      }
    } else {
      lifestyle = await WifeIslamicLifestyleModel.get(userId);
      if (!lifestyle) {
        lifestyle = new WifeIslamicLifestyleModel({ id: userId });
      }
    }

    Object.assign(lifestyle, updateDto);
    await lifestyle.save();

    return lifestyle;
  }

  async getExpectedIslamicLifestyle(userId: string) {
    const user = await this.getRepository(User).findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let lifestyle;
    if (user.gender === 'Male') {
      lifestyle = await HusbandExpectedIslamicLifestyleModel.get(userId);
    } else {
      lifestyle = await WifeExpectedIslamicLifestyleModel.get(userId);
    }

    if (!lifestyle) {
      throw new NotFoundException(
        'Expected Islamic lifestyle information not found',
      );
    }

    return lifestyle;
  }

  async updateExpectedIslamicLifestyle(
    userId: string,
    updateDto: ExpectedIslamicLifestyleDto,
  ) {
    const user = await this.getRepository(User).findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let lifestyle;
    if (user.gender === 'Male') {
      lifestyle = await HusbandExpectedIslamicLifestyleModel.get(userId);
      if (!lifestyle) {
        lifestyle = new HusbandExpectedIslamicLifestyleModel({ id: userId });
      }
    } else {
      lifestyle = await WifeExpectedIslamicLifestyleModel.get(userId);
      if (!lifestyle) {
        lifestyle = new WifeExpectedIslamicLifestyleModel({ id: userId });
      }
    }

    Object.assign(lifestyle, updateDto);
    await lifestyle.save();

    return lifestyle;
  }

  async getMarriageDiscussion(userId: string) {
    const user = await this.getRepository(User).findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const discussion = await UserMarriageDiscussionModel.get(userId);

    if (!discussion) {
      throw new NotFoundException(
        'User Marriage Discussion information not found',
      );
    }

    return discussion;
  }

  async updateMarriageDiscussion(
    userId: string,
    updateDto: UserMarriageDiscussionDto,
  ) {
    const user = await this.getRepository(User).findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let discussion = await UserMarriageDiscussionModel.get(userId);
    if (!discussion) {
      discussion = new UserMarriageDiscussionModel({ id: userId });
    }

    Object.assign(discussion, updateDto);
    await discussion.save();

    return discussion;
  }

  async getOptionalVerifiable(userId: string) {
    const user = await this.getRepository(User).findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const verifiable = await UserOptionalVerifiableModel.get(userId);

    if (!verifiable) {
      throw new NotFoundException(
        'User Optional Verifiable information not found',
      );
    }

    return verifiable;
  }

  async updateOptionalVerifiable(
    userId: string,
    updateDto: UserOptionalVerifiableDto,
  ) {
    const user = await this.getRepository(User).findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let verifiable = await UserOptionalVerifiableModel.get(userId);
    if (!verifiable) {
      verifiable = new UserOptionalVerifiableModel({ id: userId });
    }

    Object.assign(verifiable, updateDto);
    await verifiable.save();

    return verifiable;
  }

  async getFamilyIntroduction(userId: string) {
    const user = await this.getRepository(User).findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const family = await UserFamilyIntroductionModel.get(userId);

    if (!family) {
      throw new NotFoundException(
        'User family introduction information not found',
      );
    }

    return family;
  }

  async updateFamilyIntroduction(
    userId: string,
    updateDto: UserFamilyIntroductionDto,
  ) {
    const user = await this.getRepository(User).findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let family = await UserFamilyIntroductionModel.get(userId);
    if (!family) {
      family = new UserFamilyIntroductionModel({ id: userId });
    }

    if (
      updateDto.guardianEmail &&
      updateDto.guardianEmail !== user.guardian?.email
    ) {
      await this.noticeService.sendEmail(
        updateDto.guardianEmail,
        'Guardian Request',
        `You have a new guardian request from ${user.firstName} ${user.lastName}. Please <a href="${process.env.CLIENTAUTHSUCCESSURL?.slice(0, process.env.CLIENTAUTHSUCCESSURL.length - 8)}guardian">register/login</a> to your account to accept or reject the request.`,
      );
    }

    Object.assign(family, updateDto);
    await family.save();

    return family;
  }
}
