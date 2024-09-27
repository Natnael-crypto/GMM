import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Preference } from '../entities/preference.entity';
import { Repository } from 'typeorm';
import { UpdatePreferenceDto } from '../dtos/preference.dto';
import { Match } from '../entities/match.entity';
import { UserService } from '@modules/user/services/user.service';
import { User } from '@modules/user/entities/user.entity';
import { PaymentsService } from '@modules/payment/services/payment.service';
import { Filtering } from '@shared/decorators/filter.decorator';
import { getWhere } from '@shared/decorators/filter.helper';
import { MatchPool } from '../entities/match-pool.entity';

@Injectable()
export class MatchMakingService {
  constructor(
    @InjectRepository(Preference)
    private readonly preferenceRepository: Repository<Preference>,

    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,

    @InjectRepository(MatchPool)
    private readonly matchPoolRepository: Repository<MatchPool>,

    private readonly userService: UserService,
    private readonly paymentService: PaymentsService,
  ) {}

  async getUserPreference(id: string): Promise<Preference> {
    const preference = await this.preferenceRepository.findOne({
      where: { userId: id },
    });

    if (!preference) {
      const p = new Preference();
      return await this.preferenceRepository.save(p);
    }

    return preference;
  }

  async countMatches(filters: Filtering[]): Promise<number> {
    return await this.matchPoolRepository.count({
      where: getWhere(filters),
    });
  }

  async matchUser(user: User, filters: Filtering[]): Promise<Match> {
    const previousMatches = await this.getMyMatches(user.id);
    for (const previousMatch of previousMatches) {
      if (previousMatch.isActive) {
        throw new ConflictException('You already have an active match');
      }
    }

    await this.addToMatchingPool(user);

    const previousMatchedUserIds = previousMatches.map((match) => {
      if (user.gender === 'Male') {
        return match.femaleUserId;
      }

      return match.maleUserId;
    });

    const matches = await this.matchPoolRepository.find({
      where: getWhere(filters),
    });

    const validMatches = matches.filter(
      (match) => !previousMatchedUserIds.includes(match.userId),
    );

    if (!validMatches || validMatches.length === 0) {
      throw new NotFoundException('No matches found');
    }

    const randomIndex = Math.floor(Math.random() * matches.length);
    const matchedUserId = validMatches[randomIndex].userId;

    await this.userService.getUserById(matches[randomIndex].userId);

    const newMatch = new Match();

    if (user.gender === 'Male') {
      newMatch.maleUserId = user.id;
      newMatch.femaleUserId = matchedUserId;
    } else {
      newMatch.femaleUserId = user.id;
      newMatch.maleUserId = matchedUserId;
    }

    // await this.paymentService.consumeMatch(user.id);

    const match = await this.matchRepository.save(newMatch);

    await this.userService.userRepository.update(user.id, {
      isMatched: true,
    });
    await this.userService.userRepository.update(matchedUserId, {
      isMatched: true,
    });

    await this.matchPoolRepository.delete([
      matches[randomIndex].userId,
      user.id,
    ]);

    return match;
  }

  async createUserPreference(id: string): Promise<Preference> {
    const p = new Preference();
    p.userId = id;

    return await this.preferenceRepository.save(p);
  }

  async updateUserPreference(
    id: string,
    data: UpdatePreferenceDto,
  ): Promise<Preference> {
    return await this.preferenceRepository.save({ userId: id, ...data });
  }

  async addToMatchingPool(user: User) {
    return await this.matchPoolRepository.save({ ...user, userId: user.id });
  }

  async createMatch(user: User) {
    const potentialMatches = await this.filterUsersByPreference(user);
    const previousMatches = await this.getMyMatches(user.id);
    const previousMatchIds = previousMatches.map((match) => match.femaleUserId);

    for (const match of previousMatches) {
      if (match.isActive) {
        throw new ConflictException('You already have an active match');
      }
    }

    if (potentialMatches.length === 0) {
      throw new NotFoundException('No potential matches found');
    }

    for (const matchedUser of potentialMatches) {
      if (previousMatchIds.includes(matchedUser.id)) {
        continue;
      }

      const newMatch = new Match();
      newMatch.maleUserId = user.id;
      newMatch.femaleUserId = matchedUser.id;

      await this.paymentService.consumeMatch(user.id);

      const match = await this.matchRepository.save(newMatch);

      await this.userService.userRepository.update(user.id, {
        isMatched: true,
      });
      await this.userService.userRepository.update(matchedUser.id, {
        isMatched: true,
      });

      return match;
    }

    throw new NotFoundException('No potential matches found');
  }

  async getCurrentMatches(): Promise<Match[]> {
    return await this.matchRepository.find({ where: { isActive: true } });
  }

  async getMyMatches(userId: string): Promise<Match[]> {
    return await this.matchRepository.find({
      where: [{ maleUserId: userId }, { femaleUserId: userId }],
      relations: ['maleUser', 'femaleUser'],
    });
  }

  async getCurrentMatch(userId: string): Promise<Match> {
    const matches = await this.getMyMatches(userId);

    for (const match of matches) {
      if (match.isActive) {
        return match;
      }
    }

    throw new NotFoundException('No active match found');
  }

  async getMatch(matchId: string): Promise<Match> {
    const match = await this.matchRepository.findOne({
      where: { id: matchId },
      relations: ['maleUser', 'femaleUser'],
    });

    if (!match) {
      throw new NotFoundException('Match not found');
    }

    return match;
  }

  async unmatchByMatchId(matchId: string) {
    const match = await this.getMatch(matchId);

    if (!match.isActive) {
      throw new BadRequestException('Match is already inactive');
    }

    match.isActive = false;

    await this.userService.userRepository.update(match.maleUserId, {
      isMatched: false,
    });
    await this.userService.userRepository.update(match.femaleUserId, {
      isMatched: false,
    });

    return await this.matchRepository.save(match);
  }

  async unmatchByUserId(userId: string) {
    const match = await this.getCurrentMatch(userId);

    match.isActive = false;

    await this.userService.userRepository.update(match.maleUserId, {
      isMatched: false,
    });
    await this.userService.userRepository.update(match.femaleUserId, {
      isMatched: false,
    });

    return await this.matchRepository.save(match);
  }

  async filterUsersByPreference(origUser: User) {
    const preference = await this.getUserPreference(origUser.id);

    const users = await this.userService.findAll();
    const matches: any[] = [];

    for (const user of users) {
      if (user.id === origUser.id || user.gender === origUser.gender) {
        continue;
      }

      if (preference.minAge) {
        if (user.age < preference.minAge) {
          continue;
        }
      }

      if (preference.maxAge) {
        if (user.age > preference.maxAge) {
          continue;
        }
      }

      if (preference.minHeight) {
        if (user.height < preference.minHeight) {
          continue;
        }
      }

      if (preference.maxHeight) {
        if (user.height > preference.maxHeight) {
          continue;
        }
      }

      if (preference.minWeight) {
        if (user.weight < preference.minWeight) {
          continue;
        }
      }

      if (preference.maxWeight) {
        if (user.weight > preference.maxWeight) {
          continue;
        }
      }

      if (preference.nationality) {
        if (user.nationality !== preference.nationality) {
          continue;
        }
      }

      if (preference.language && user.languages) {
        if (!user.languages.includes(preference.language)) {
          continue;
        }
      }

      if (preference.countryOfOrigin) {
        if (user.countryOfOrigin !== preference.countryOfOrigin) {
          continue;
        }
      }

      if (preference.martialStatus) {
        if (user.maritalStatus !== preference.martialStatus) {
          continue;
        }
      }

      if (preference.salat) {
        if (user.salat !== preference.salat) {
          continue;
        }
      }

      if (preference.bornOrRevert) {
        if (user.bornOrRevertToIslam !== preference.bornOrRevert) {
          continue;
        }
      }

      if (preference.hijab) {
        if (user.hijab !== preference.hijab) {
          continue;
        }
      }

      if (preference.education) {
        if (user.education !== preference.education) {
          continue;
        }
      }

      if (preference.profession) {
        if (user.profession !== preference.profession) {
          continue;
        }
      }

      if (preference.drinking != null || preference.drinking != undefined) {
        if (user.drinks !== preference.drinking) {
          continue;
        }
      }

      if (preference.smoking != null || preference.smoking != undefined) {
        if (user.smokes !== preference.smoking) {
          continue;
        }
      }

      if (preference.tattoos != null || preference.tattoos != undefined) {
        if (user.tattoos !== preference.tattoos) {
          continue;
        }
      }

      matches.push(user);
    }

    return matches;
  }
}
