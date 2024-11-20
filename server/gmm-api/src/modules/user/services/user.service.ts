import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserDto } from '../dtos/user.dto';
import { ExpectedIslamicLifestyleDto } from '../dtos/expected-islamic-lifestyle.dto';
import { UserIslamicLifestyleDto } from '../dtos/user-islamic-lifestyle.dto';
import { UserWorldlyLifestyleDto } from '../dtos/user-worldly-lifestyle.dto';
import { ExpectedWorldlyLifestyleDto } from '../dtos/expected-worldly-lifestyle.dto';
import { UserMarriageDiscussionDto } from '../dtos/user-marriage-discussion.dto';
import { UserOptionalVerifiableDto } from '../dtos/user-optional-verifiable.dto';
import { UserFamilyIntroductionDto } from '../dtos/user-family-introduction-dto';
import { Pagination } from '@shared/decorators/pagination.decorator';
import { Sorting } from '@shared/decorators/sorting.decorator';
import { Filtering } from '@shared/decorators/filter.decorator';
import { getWhere, getOrder } from '@shared/decorators/filter.helper';
import { ExpressRegistrationDto } from '../dtos/express-registration';
import { GuardianService } from '../services/guardian.service';
import { BaseRepository } from '@shared/base-repository';
import { DataSource, ObjectLiteral } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { AccountStatus, Gender } from '../enums/user.enum';
import { Match } from '@modules/matchmaking/entities/match.entity';
import {
  UserWorldlyLifestyle,
  MaleIslamicLifestyle,
  MaleExpectedWorldlyLifestyle,
  FemaleExpectedWorldlyLifestyle,
  MaleExpectedIslamicLifestyle,
  FemaleExpectedIslamicLifestyle,
  FemaleIslamicLifestyle,
  UserMarriageDiscussion,
  UserOptionalVerifiable,
  UserFamilyInformation,
} from '@modules/user/entities';

@Injectable({ scope: Scope.REQUEST })
export class UserService extends BaseRepository {
  constructor(
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

      user.gender !== Gender.MALE &&
        dto.guardianEmail !== user.email &&
        this.updateFamilyInformation(userId, {
          guardianEmail: dto.guardianEmail,
          guardianFirstName: dto.guardianFirstName,
          guardianLastName: dto.guardianLastName,
          guardianPhoneNumber: dto.guardianPhoneNumber,
          relationshipToGuardian: dto.relationshipToGuardian,
        }),

      user.gender !== Gender.MALE &&
        dto.guardianEmail !== user.email &&
        this.guardianService.requestGuardian(user, {
          guardianEmail: dto.guardianEmail,
          relationshipToGuardian: dto.relationshipToGuardian,
        }),
    ]);
  }

  async updateUser(user: User) {
    return await this.getRepository(User).save(user);
  }

  async getUserInformation(
    userId: string,
    relations: string[],
    accessorKey: string,
  ) {
    const user = await this.getRepository(User).findOne({
      where: { id: userId },
      select: { id: true, gender: true },
      relations,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (!user[accessorKey]) {
      throw new NotFoundException('User information not found');
    }

    return user[accessorKey];
  }

  async getWorldlyLifestyle(userId: string) {
    return await this.getUserInformation(
      userId,
      ['worldlyLifestyle'],
      'worldlyLifestyle',
    );
  }

  async getIslamicLifestyle(userId: string) {
    return await this.getUserInformation(
      userId,
      ['maleIslamicLifestyle', 'femaleIslamicLifestyle'],
      'islamicLifestyle',
    );
  }

  async getExpectedWorldlyLifestyle(userId: string) {
    return await this.getUserInformation(
      userId,
      ['maleExpectedWorldlyLifestyle', 'femaleExpectedWorldlyLifestyle'],
      'expectedWorldlyLifestyle',
    );
  }

  async getExpectedIslamicLifestyle(userId: string) {
    return await this.getUserInformation(
      userId,
      ['maleExpectedIslamicLifestyle', 'femaleExpectedIslamicLifestyle'],
      'expectedIslamicLifestyle',
    );
  }

  async getMarriageDiscussion(userId: string) {
    return await this.getUserInformation(
      userId,
      ['marriageDiscussion'],
      'marriageDiscussion',
    );
  }

  async getFamilyInformation(userId: string) {
    return await this.getUserInformation(
      userId,
      ['familyInformation'],
      'familyInformation',
    );
  }

  async getOptionalVerifiable(userId: string) {
    return await this.getUserInformation(
      userId,
      ['optionalVerifiable'],
      'optionalVerifiable',
    );
  }

  async updateUserInformation(
    userId: string,
    maleClass: new () => ObjectLiteral,
    femaleClass: new () => ObjectLiteral,
    data: any,
  ) {
    try {
      const user = await this.getRepository(User).findOneOrFail({
        where: { id: userId },
        select: { id: true, gender: true },
      });

      let entityClass = user.gender === Gender.MALE ? maleClass : femaleClass;

      const result = await this.getRepository(entityClass).upsert(
        { ...data, userId },
        ['userId'],
      );

      if (result) {
        return { ...data, userId };
      } else {
        throw new NotFoundException('User information not found');
      }
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }

  async updateWorldlyLifestyle(
    userId: string,
    updateDto: UserWorldlyLifestyleDto,
  ) {
    return await this.updateUserInformation(
      userId,
      UserWorldlyLifestyle,
      UserWorldlyLifestyle,
      updateDto,
    );
  }

  async updateExpectedWorldlyLifestyle(
    userId: string,
    updateDto: ExpectedWorldlyLifestyleDto,
  ) {
    return await this.updateUserInformation(
      userId,
      MaleExpectedWorldlyLifestyle,
      FemaleExpectedWorldlyLifestyle,
      updateDto,
    );
  }

  async updateIslamicLifestyle(
    userId: string,
    updateDto: UserIslamicLifestyleDto,
  ) {
    return await this.updateUserInformation(
      userId,
      MaleIslamicLifestyle,
      FemaleIslamicLifestyle,
      updateDto,
    );
  }

  async updateExpectedIslamicLifestyle(
    userId: string,
    updateDto: ExpectedIslamicLifestyleDto,
  ) {
    return await this.updateUserInformation(
      userId,
      MaleExpectedIslamicLifestyle,
      FemaleExpectedIslamicLifestyle,
      updateDto,
    );
  }

  async updateMarriageDiscussion(
    userId: string,
    updateDto: UserMarriageDiscussionDto,
  ) {
    return await this.updateUserInformation(
      userId,
      UserMarriageDiscussion,
      UserMarriageDiscussion,
      updateDto,
    );
  }

  async updateFamilyInformation(
    userId: string,
    updateDto: UserFamilyIntroductionDto,
  ) {
    return await this.updateUserInformation(
      userId,
      UserFamilyInformation,
      UserFamilyInformation,
      updateDto,
    );
  }

  async updateOptionalVerifiable(
    userId: string,
    updateDto: UserOptionalVerifiableDto,
  ) {
    return await this.updateUserInformation(
      userId,
      UserOptionalVerifiable,
      UserOptionalVerifiable,
      updateDto,
    );
  }
}
