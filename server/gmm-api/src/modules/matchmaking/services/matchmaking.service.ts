import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';

import { Preference } from '../entities/preference.entity';
import { And, DataSource, Not } from 'typeorm';
import { UpdatePreferenceDto } from '../dtos/preference.dto';
import { Match } from '../entities/match.entity';
import { UserService } from '@modules/user/services/user.service';
import { User } from '@modules/user/entities/user.entity';
import { PaymentsService } from '@modules/payment/services/payment.service';
import { Filtering } from '@shared/decorators/filter.decorator';
import { getWhere } from '@shared/decorators/filter.helper';
import { MatchPool } from '../entities/match-pool.entity';
import { Gender } from '@modules/user/enums/user.enum';
import { ExtendedUser, Matchmaker } from '../core/matchmaker';
import { BaseRepository } from '@shared/base-repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {
  InvitationToMatchStageStatus,
  MatchStage,
} from '../enums/matchmaking.enum';
import { InvitationToMatchStage } from '../entities/invitation-to-match-stage.entity';

@Injectable({ scope: Scope.REQUEST })
export class MatchMakingService extends BaseRepository {
  constructor(
    private readonly userService: UserService,
    private readonly paymentService: PaymentsService,
    @Inject(REQUEST) req: Request,
    dataSource: DataSource,
  ) {
    super(dataSource, req);
  }

  async getUserPreference(id: string): Promise<Preference> {
    const preference = await this.getRepository(Preference).findOne({
      where: { userId: id },
    });

    if (!preference) {
      const p = new Preference();
      return await this.getRepository(Preference).save(p);
    }

    return preference;
  }

  async countMatches(filters: Filtering[]): Promise<number> {
    return await this.getRepository(MatchPool).count({
      where: getWhere(filters),
    });
  }

  async loadFullUserData(user: User): Promise<ExtendedUser> {
    let worldlyLifestyle;
    let islamicLifestyle;

    try {
      worldlyLifestyle = await this.userService.getWorldlyLifestyle(user.id);
    } catch (e) {}
    try {
      islamicLifestyle = await this.userService.getIslamicLifestyle(user.id);
    } catch (e) {}

    return {
      ...user,
      ...worldlyLifestyle,
      ...islamicLifestyle,
    };
  }

  async loadCandidates(user: User): Promise<ExtendedUser[]> {
    const previousMatches = await this.getUserMatches(user.id);
    for (const previousMatch of previousMatches) {
      if (previousMatch.isActive) {
        throw new ConflictException('You already have an active match');
      }
    }

    const previousMatchedUserIds = previousMatches.map((match) => {
      if (user.gender === Gender.MALE) {
        return match.femaleUserId;
      }

      return match.maleUserId;
    });

    const matchPool = await this.getRepository(MatchPool).find({
      where: {
        user: {
          gender: Not(user.gender),
        },
        userId: And(
          Not(user.id),
          ...previousMatchedUserIds.map((id) => Not(id)),
        ),
      },
      relations: ['user'],
    });

    const candidates = Promise.all<ExtendedUser>(
      matchPool.map((candidate) => this.loadFullUserData(candidate.user)),
    );

    return candidates;
  }

  async assignMatch(user: User, matchedUserId: string): Promise<Match> {
    const newMatch = new Match();

    if (user.gender === 'Male') {
      newMatch.maleUserId = user.id;
      newMatch.femaleUserId = matchedUserId;
    } else {
      newMatch.femaleUserId = user.id;
      newMatch.maleUserId = matchedUserId;
    }

    await this.paymentService.consumeMatch(user.id);

    const match = await this.getRepository(Match).save(newMatch);
    await this.getRepository(MatchPool).delete([matchedUserId, user.id]);

    return match;
  }

  async matchUser(user: User, tolerance: number = 0): Promise<Match | null> {
    const candidates = await this.loadCandidates(user);

    const matchmaker = new Matchmaker(await this.loadFullUserData(user));

    const score = matchmaker.score(candidates);

    const qualifiedCandidates = score.filter((match) => {
      if (tolerance === 0) {
        return match.score === 1;
      } else {
        return 1 - match.score >= tolerance;
      }
    });

    if (qualifiedCandidates.length === 0) {
      await this.addToMatchingPool(user);
      return null;
    }

    const randomIndex = Math.floor(Math.random() * qualifiedCandidates.length);
    const matchedUserId = qualifiedCandidates[randomIndex].user.id;

    return await this.assignMatch(user, matchedUserId);
  }

  async createUserPreference(id: string): Promise<Preference> {
    const p = new Preference();
    p.userId = id;

    return await this.getRepository(Preference).save(p);
  }

  async updateUserPreference(
    id: string,
    data: UpdatePreferenceDto,
  ): Promise<Preference> {
    return await this.getRepository(Preference).save({ userId: id, ...data });
  }

  async addToMatchingPool(user: User) {
    return await this.getRepository(MatchPool).save({
      ...user,
      userId: user.id,
    });
  }

  async getActiveMatches(): Promise<Match[]> {
    return await this.getRepository(Match).find({ where: { isActive: true } });
  }

  async getAllMatches(): Promise<Match[]> {
    return await this.getRepository(Match).find({
      relations: ['maleUser', 'femaleUser', 'invitations'],
    });
  }

  async getPreviousMatches(): Promise<Match[]> {
    return await this.getRepository(Match).find({ where: { isActive: false } });
  }

  async getUsersInMatchPool(): Promise<MatchPool[]> {
    return await this.getRepository(MatchPool).find({
      relations: ['user'],
    });
  }

  async getUserMatches(userId: string): Promise<Match[]> {
    return await this.getRepository(Match).find({
      where: [{ maleUserId: userId }, { femaleUserId: userId }],
      relations: ['maleUser', 'femaleUser', 'invitations'],
    });
  }

  async getActiveMatch(userId: string): Promise<Match> {
    const matches = await this.getUserMatches(userId);

    for (const match of matches) {
      if (match.isActive) {
        return match;
      }
    }

    throw new NotFoundException('No active match found');
  }

  async getMatch(matchId: string): Promise<Match> {
    const match = await this.getRepository(Match).findOne({
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

    // Rule 1: Match must be active
    if (!match.isActive) {
      throw new BadRequestException(
        'You are no longer matched with this user.',
      );
    }

    if (user.id !== match.femaleUserId && user.id !== match.maleUserId) {
      throw new ForbiddenException();
    }

    // Rule 2: There must be no pending invitation
    const pendingInvite = match.invitations.filter(
      (invitation) =>
        invitation.status === InvitationToMatchStageStatus.PENDING,
    );

    if (pendingInvite.length > 0) {
      throw new BadRequestException(
        'You have already invited your match to the next stage.',
      );
    }

    // Rule 3: User must wait at least 3 minutes before inviting the user to next stage
    const sortedInvitations = match.invitations
      .filter(
        (invitation) =>
          invitation.status === InvitationToMatchStageStatus.ACCEPTED,
      )
      .sort((a, b) => {
        return (
          new Date(b.acceptedOrRejectedAt).getTime() -
          new Date(a.acceptedOrRejectedAt).getTime()
        );
      });

    const lastAcceptedInvitation = sortedInvitations[0];

    if (lastAcceptedInvitation) {
      const now = new Date();
      const lastInvitationTime = lastAcceptedInvitation.acceptedOrRejectedAt;
      const diffInMs = now.getTime() - new Date(lastInvitationTime).getTime();
      const diffInMinutes = diffInMs / (1000 * 60);

      if (diffInMinutes < 3) {
        throw new BadRequestException(
          'Please wait at least 3 minutes before inviting the user to next stage.',
        );
      }
    }

    // Rule 4: User not must be at the last stage
    if (match.stage === MatchStage.FAMILY_INTRODUCTION) {
      throw new BadRequestException('You are already at the last stage');
    }

    const invitationRepo = this.getRepository(InvitationToMatchStage);

    const invitation = invitationRepo.create({
      inviterId: user.id,
      matchId: matchId,
    });

    return await invitationRepo.save(invitation);
  }

  async acceptOrRejectMatchStageInvitation(
    invitationId: string,
    user: User,
    action: InvitationToMatchStageStatus,
  ) {
    const invitation = await this.getRepository(InvitationToMatchStage).findOne(
      {
        where: { id: invitationId },
        relations: ['match'],
      },
    );

    if (!invitation) {
      throw new NotFoundException();
    }

    // TOOD: Refactor rules later

    // Rule 1: Invitation must be pending
    if (invitation.status !== InvitationToMatchStageStatus.PENDING) {
      throw new BadRequestException('Invitation has expired');
    }

    // Rule 2: Inviter can't accept/reject invitation
    if (invitation.inviterId === user.id) {
      throw new BadRequestException("Inviter can't accept/reject invitation");
    }

    // Rule 3: User must be part of the match
    if (
      invitation.match.femaleUserId !== user.id &&
      invitation.match.maleUserId !== user.id
    ) {
      throw new ForbiddenException();
    }

    // Rule 4: User can't accept/reject invitation if match is inactive
    if (!invitation.match.isActive) {
      throw new BadRequestException('Match is already inactive');
    }

    // Rule 5: Invitation will expire in 24 hrs
    const now = new Date();
    const diffInMs = now.getTime() - invitation.sentAt.getTime();
    const diffInHrs = diffInMs / (1000 * 60 * 60);

    if (diffInHrs > 24) {
      await this.getRepository(InvitationToMatchStage).update(invitation.id, {
        status: InvitationToMatchStageStatus.EXPIRED,
      });

      return {
        result: 'Invitation has expired',
      };
    }

    switch (action) {
      case InvitationToMatchStageStatus.ACCEPTED:
        invitation.status = InvitationToMatchStageStatus.ACCEPTED;
        invitation.acceptedOrRejectedAt = now;

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

        await this.getRepository(Match).save(invitation.match);
        await this.getRepository(InvitationToMatchStage).save(invitation);
        break;
      case InvitationToMatchStageStatus.REJECTED:
        invitation.status = InvitationToMatchStageStatus.REJECTED;
        invitation.acceptedOrRejectedAt = now;
        await this.getRepository(InvitationToMatchStage).save(invitation);
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

    return await this.getRepository(Match).save(match);
  }

  async unmatchByUserId(userId: string) {
    const match = await this.getActiveMatch(userId);

    match.isActive = false;

    return await this.getRepository(Match).save(match);
  }
}
