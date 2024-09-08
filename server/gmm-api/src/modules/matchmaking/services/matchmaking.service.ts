import {
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

@Injectable()
export class MatchMakingService {
  constructor(
    @InjectRepository(Preference)
    private readonly preferenceRepository: Repository<Preference>,

    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,

    private readonly userService: UserService,
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

  async updateUserPreference(
    id: string,
    data: UpdatePreferenceDto,
  ): Promise<Preference> {
    return await this.preferenceRepository.save({ userId: id, ...data });
  }

  async createMatch(user: User) {
    const potentialMatches = await this.filterUsersByPreference(user);
    const previousMatches = await this.getMatches(user.id);
    const previousMatchIds = previousMatches.map((match) => match.femaleUserId);

    for (const match of previousMatches) {
      if (match.isActive) {
        throw new ConflictException('You already have an active match');
      }
    }

    if (potentialMatches.length === 0) {
      throw new NotFoundException('No potential matches found');
    }

    for (const match of potentialMatches) {
      if (previousMatchIds.includes(match.id)) {
        continue;
      }

      const newMatch = new Match();
      newMatch.maleUserId = user.id;
      newMatch.femaleUserId = match.id;

      return await this.matchRepository.save(newMatch);
    }

    throw new NotFoundException('No potential matches found');
  }

  async getMatches(userId: string): Promise<Match[]> {
    return await this.matchRepository.find({
      where: [{ maleUserId: userId }, { femaleUserId: userId }],
      relations: ['maleUser', 'femaleUser'],
    });
  }

  async getCurrentMatch(userId: string): Promise<Match> {
    const matches = await this.getMatches(userId);

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
