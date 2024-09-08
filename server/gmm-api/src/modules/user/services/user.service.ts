import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EmailLists } from '@shared/config';
import { EMAIL_LISTS_ID } from '../user.module';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { UserDto } from '../dtos/user.dto';
import { ExpectedIslamicLifestyleModel } from '../entities/expected-islamic-lifestyle.schema';
import { ExpectedIslamicLifestyleDto } from '../dtos/expected-islamic-lifestyle.dto';
import { UserWorldlyLifestyleModel } from '../entities/user-worldly-lifestyle.schema';
import { UserIslamicLifestyleModel } from '../entities/user-islamic-lifestyle.schema';
import { UserIslamicLifestyleDto } from '../dtos/user-islamic-lifestyle.dto';
import { UserWorldlyLifestyleDto } from '../dtos/user-worldly-lifestyle.dto';
import { ExpectedWorldlyLifestyleModel } from '../entities/expected-worldly-lifestyle.schema';
import { ExpectedWorldlyLifestyleDto } from '../dtos/expected-worldly-lifestyle.dto';
import { UserMarriageDiscussionModel } from '../entities/user-marriage-discussion.schema';
import { UserMarriageDiscussionDto } from '../dtos/user-marriage-discussion.dto';
import { UserOptionalVerifiableModel } from '../entities/user-optional-verifiable.schema';
import { UserOptionalVerifiableDto } from '../dtos/user-optional-verifiable.dto';
import { UserFamilyIntroductionModel } from '../entities/user-family-introduction.schema';
import { UserFamilyIntroductionDto } from '../dtos/user-family-introduction-dto';

@Injectable()
export class UserService implements EmailLists {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getList(id: string): Promise<string[]> {
    switch (id) {
      case EMAIL_LISTS_ID.All_Registered_Users:
        const users = await this.userRepository.find();
        return users.map((user) => user.email);
    }
    return [];
  }

  async findAll() {
    const users = await this.userRepository.find();
    return Promise.all(
      users.map(async (user) => {
        const { password, ...userWithoutPassword } = user;
        let worldlyLifestyle;
        let islamicLifestyle;

        try {
          worldlyLifestyle = await this.getWorldyLifestyle(user.id);
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
    try {

    
      const user = await this.userRepository.findOne({where: {id}});
      if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async create(createUserDto: UserDto) {
    return this.userRepository.save({
      ...createUserDto,
      createdAt: new Date(),
    });
  }

  async getWorldyLifestyle(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

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
    const user = await this.userRepository.findOne({ where: { id: userId } });

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

  async getExpectedWorldyLifestyle(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const lifestyle = await ExpectedWorldlyLifestyleModel.get(userId);

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
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let lifestyle = await ExpectedWorldlyLifestyleModel.get(userId);
    if (!lifestyle) {
      lifestyle = new ExpectedWorldlyLifestyleModel({ id: userId });
    }

    Object.assign(lifestyle, updateDto);
    await lifestyle.save();

    return lifestyle;
  }

  async getIslamicLifestyle(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const lifestyle = await UserIslamicLifestyleModel.get(userId);

    if (!lifestyle) {
      throw new NotFoundException('Islamic lifestyle information not found');
    }

    return lifestyle;
  }

  async updateIslamicLifestyle(
    userId: string,
    updateDto: UserIslamicLifestyleDto,
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let lifestyle = await UserIslamicLifestyleModel.get(userId);
    if (!lifestyle) {
      lifestyle = new UserIslamicLifestyleModel({ id: userId });
    }

    Object.assign(lifestyle, updateDto);
    await lifestyle.save();

    return lifestyle;
  }

  async getExpectedIslamicLifestyle(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const lifestyle = await ExpectedIslamicLifestyleModel.get(userId);

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
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let lifestyle = await ExpectedIslamicLifestyleModel.get(userId);
    if (!lifestyle) {
      lifestyle = new ExpectedIslamicLifestyleModel({ id: userId });
    }

    Object.assign(lifestyle, updateDto);
    await lifestyle.save();

    return lifestyle;
  }

  async getMarriageDiscussion(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

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
    const user = await this.userRepository.findOne({ where: { id: userId } });

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
    const user = await this.userRepository.findOne({ where: { id: userId } });

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
    const user = await this.userRepository.findOne({ where: { id: userId } });

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
    const user = await this.userRepository.findOne({ where: { id: userId } });

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
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let family = await UserFamilyIntroductionModel.get(userId);
    if (!family) {
      family = new UserFamilyIntroductionModel({ id: userId });
    }

    Object.assign(family, updateDto);
    await family.save();

    return family;
  }
}
