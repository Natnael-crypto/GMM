import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Preference } from '../entities/preference.entity';
import { Repository } from 'typeorm';
import { UpdatePreferenceDto } from '../dtos/preference.dto';
import { Match, MatchStage } from '../entities/match.entity';
import { UserService } from '@modules/user/services/user.service';
import { User } from '@modules/user/entities/user.entity';
import { PaymentsService } from '@modules/payment/services/payment.service';
import { Filtering } from '@shared/decorators/filter.decorator';
import { getWhere } from '@shared/decorators/filter.helper';
import { MatchPool } from '../entities/match-pool.entity';
import {
  StageInvitation,
  StageInvitationStatus,
} from '../entities/match-invitation.entity';

@Injectable()
export class MatchMakingService {
  constructor(
    @InjectRepository(Preference)
    private readonly preferenceRepository: Repository<Preference>,

    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,

    @InjectRepository(MatchPool)
    private readonly matchPoolRepository: Repository<MatchPool>,

    @InjectRepository(StageInvitation)
    private readonly stageInvitationRepository: Repository<StageInvitation>,

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

  async matchUser(
    user: User,
    filters: Filtering[],
    fuzzyThreshold: number = 0,
  ): Promise<Match> {
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

    previousMatchedUserIds.push(user.id);

    let matches;
    if (fuzzyThreshold === 0) {
      matches = await this.matchPoolRepository.find({
        where: getWhere(filters),
      });
    } else {
      matches = await this.matchPoolRepository.find({
        where: {
          gender: user.gender === 'Male' ? 'Female' : 'Male',
        },
      });
    }

    const validMatches = matches.filter(
      (match) => !previousMatchedUserIds.includes(match.userId),
    );

    if (!validMatches || validMatches.length === 0) {
      throw new NotFoundException('No matches found');
    }

    let matchedUserId;
    if (fuzzyThreshold === 0) {
      const randomIndex = Math.floor(Math.random() * matches.length);
      matchedUserId = validMatches[randomIndex].userId;
    } else {
      matchedUserId = this.chooseMatch(validMatches, filters, fuzzyThreshold);
    }

    if (!matchedUserId) {
      throw new NotFoundException('No matches found');
    }

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

    await this.matchPoolRepository.delete([matchedUserId, user.id]);

    return match;
  }

  chooseMatch(matches, filters, fuzzyThreshold) {
    const validMatches = matches.filter((match) => {
      return this.calculateMatchScore(match, filters) >= fuzzyThreshold;
    });

    if (validMatches.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * validMatches.length);
    return validMatches[randomIndex].userId;
  }

  calculateMatchScore(match, filters) {
    let penalty = 0;
    for (const key of Object.keys(filters)) {
      if (match[key] !== filters[key]) {
        penalty++;
      }
    }
    return 1 - penalty / Object.keys(match).length;
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

  async getAllMatches(): Promise<Match[]> {
    return await this.matchRepository.find({
      relations: ['maleUser', 'femaleUser', 'invitations'],
    });
  }

  async getPreviousMatches(): Promise<Match[]> {
    return await this.matchRepository.find({ where: { isActive: false } });
  }

  async getUsersInMatchPool(): Promise<MatchPool[]> {
    return await this.matchPoolRepository.find({
      relations: ['user'],
    });
  }

  async getMyMatches(userId: string): Promise<Match[]> {
    return await this.matchRepository.find({
      where: [{ maleUserId: userId }, { femaleUserId: userId }],
      relations: ['maleUser', 'femaleUser', 'invitations'],
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
      relations: ['maleUser', 'femaleUser', 'invitations'],
    });

    if (!match) {
      throw new NotFoundException('Match not found');
    }

    return match;
  }

  async inviteToNextStage(matchId: string, user: User) {
    const match = await this.getMatch(matchId);

    if (!match.isActive) {
      throw new BadRequestException(
        'You are no longer matched with this user.',
      );
    }

    if (user.id !== match.femaleUserId && user.id !== match.maleUserId) {
      throw new ForbiddenException();
    }

    const now = new Date();
    const lastInvitationTime = match.lastInvitationAcceptedAt;

    const diffInMs = now.getTime() - new Date(lastInvitationTime).getTime();
    const diffInMinutes = diffInMs / (1000 * 60);

    if (diffInMinutes < 3) {
      throw new BadRequestException(
        'Please wait at least 3 minutes before inviting the user to next stage.',
      );
    }

    if (match.stage === MatchStage.FAMILY_INTRODUCTION) {
      throw new BadRequestException('You are already at the last stage');
    }

    const pendingInvite = await this.stageInvitationRepository.findOne({
      where: {
        matchId,
        status: StageInvitationStatus.PENDING,
      },
    });

    if (pendingInvite) {
      throw new BadRequestException(
        'You have already invited your match to the next stage.',
      );
    }

    const invitation = this.stageInvitationRepository.create({
      inviterId: user.id,
      matchId: match.id,
    });

    return await this.stageInvitationRepository.save(invitation);
  }

  async acceptOrRejectMatchStageInvitation(
    invitationId: string,
    user: User,
    action: StageInvitationStatus,
  ) {
    const invitation = await this.stageInvitationRepository.findOne({
      where: { id: invitationId },
      relations: ['match'],
    });

    if (!invitation) {
      throw new NotFoundException();
    }

    if (invitation.status !== StageInvitationStatus.PENDING) {
      throw new BadRequestException('Invitation has expired');
    }

    if (invitation.inviterId === user.id) {
      throw new BadRequestException("Inviter can't accept/reject invitation");
    }

    if (
      invitation.match.femaleUserId !== user.id &&
      invitation.match.maleUserId !== user.id
    ) {
      throw new ForbiddenException();
    }

    const now = new Date();
    switch (action) {
      case StageInvitationStatus.ACCEPTED:
        invitation.status = StageInvitationStatus.ACCEPTED;
        invitation.acceptedOrRejectedAt = now;
        invitation.match.lastInvitationAcceptedAt = now;

        let nextStage;
        switch (invitation.match.stage) {
          case MatchStage.BASIC_INFORMATION:
            nextStage = MatchStage.WORLDLY_LIFESTYLE;
            break;
          case MatchStage.WORLDLY_LIFESTYLE:
            nextStage = MatchStage.ISLAMIC_LIFESTYLE;
            break;
          case MatchStage.ISLAMIC_LIFESTYLE:
            nextStage = MatchStage.MARRIAGE_DISCUSSION;
            break;
          case MatchStage.MARRIAGE_DISCUSSION:
            nextStage = MatchStage.FAMILY_INTRODUCTION;
            break;
          case MatchStage.FAMILY_INTRODUCTION:
            throw new BadRequestException('You are already at the last stage');
          default:
            throw new BadRequestException('Invalid match stage');
        }
        invitation.match.stage = nextStage;
        await this.matchRepository.save(invitation.match);
        await this.stageInvitationRepository.save(invitation);
        break;
      case StageInvitationStatus.REJECTED:
        invitation.status = StageInvitationStatus.REJECTED;
        invitation.acceptedOrRejectedAt = now;
        await this.stageInvitationRepository.save(invitation);
        break;
      default:
        throw new BadRequestException('Unknown action');
    }
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
