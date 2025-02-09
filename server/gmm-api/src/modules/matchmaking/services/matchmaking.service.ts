import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { Preference } from '../entities/preference.entity';
import { And, DataSource, In, Not } from 'typeorm';
import { UpdatePreferenceDto } from '../dtos/preference.dto';
import { Match } from '../entities/match.entity';
import { User } from '@modules/user/entities/user.entity';
import { PaymentsService } from '@modules/payment/services/payment.service';
import { Filtering } from '@shared/decorators/filter.decorator';
import { getWhere } from '@shared/decorators/filter.helper';
import { MatchPool } from '../entities/match-pool.entity';
import { Gender } from '@modules/user/enums/user.enum';
import { Matchmaker } from '../core/matchmaker';
import { BaseRepository } from '@shared/base-repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {
  InvitationToMatchStageStatus,
  MatchStage,
} from '../enums/matchmaking.enum';
import { InvitationToMatchStage } from '../entities/invitation-to-match-stage.entity';
import { InviteToNextStageNotification } from '@modules/notifications/notifications/invite-to-next-stage.notification';
import { NotificationService } from '@modules/notifications/services/notification.service';
import { MatchedNotification } from '@modules/notifications/notifications/matched.notification';
import { UserService } from '@modules/user/services/user.service';
import { AddedToMatchPoolNotification } from '@modules/notifications/notifications/added-to-match-pool.notification';
import { ResponseInviteNotification } from '@modules/notifications/notifications/response-invite.notification';
import {
  AllowMatchUserProfileDto,
  AllowMatchChatDto,
} from '../dtos/allow-match-data.dto';
import { NoticeService } from '@modules/notice/services/notice.service';
import { FamilyInfoDto } from '../dtos/family-info.dto';
import { FamilyInformationNotification } from '@modules/notifications/notifications/family-information-sent.notification';
import { FamilyInformationExchangeStatus } from '../enums/family-information-exchange-status.enum';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QueueNames } from '@shared/queues';
import { FormService } from '@modules/form/services/form.service';

@Injectable({ scope: Scope.REQUEST })
export class MatchMakingService extends BaseRepository {
  constructor(
    private readonly paymentService: PaymentsService,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
    private readonly noticeService: NoticeService,
    private readonly formService: FormService,
    @InjectQueue(QueueNames.MATCH_QUEUE) private readonly matchQueue: Queue,
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

  async loadCandidates(user: User, limit?: number): Promise<string[]> {
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
      select: ['userId'],
      take: limit,
    });

    const candidateIds = matchPool.map((pool) => pool.userId);

    return candidateIds;
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
    await this.paymentService.consumeMatch(matchedUserId);

    const match = await this.getRepository(Match).save(newMatch);
    await this.getRepository(MatchPool).delete([matchedUserId, user.id]);

    const maleUser = await this.userService.getUserById(newMatch.maleUserId);
    const femaleUser = await this.userService.getUserById(
      newMatch.femaleUserId,
    );

    const notification = new MatchedNotification(
      match,
      maleUser.firstName,
      femaleUser.firstName,
    );
    await this.notificationService.send(notification);

    return match;
  }

  async match(userId: string): Promise<any> {
    const user = await this.getRepository(User).findOneOrFail({
      where: { id: userId },
      relations: ['subscription'],
    });

    if (!user.subscription || user.subscription.remainingMatches <= 0) {
      throw new BadRequestException(
        'You need an active subscription to be matched.',
      );
    }

    const previousMatches = await this.getUserMatches(user.id);
    for (const previousMatch of previousMatches) {
      if (previousMatch.isActive) {
        throw new ConflictException('You already have an active match');
      }
    }

    const newlyAddedToPool = await this.addToMatchingPool(user);

    await this.matchQueue.add('match', { userId });

    return { match: null, newlyAddedToPool };
  }

  async matchUser(userId: string): Promise<any> {
    const user = await this.getRepository(User).findOneOrFail({
      where: { id: userId },
    });

    if (!user.preference) {
      user.preference = await this.createUserPreference(userId);
    }

    const candidateIds = await this.loadCandidates(user);

    const candidates = (
      await this.getRepository(User).find({
        where: { id: In(candidateIds) },
      })
    ).map((candidate) => {
      if (!candidate.preference) {
        candidate.preference = new Preference();
      }

      return candidate;
    });

    const matchmaker = new Matchmaker(user);

    const score = matchmaker.score(candidates);

    const userReq = user.preference.minMatchRequirement ?? 1;

    const qualifiedCandidates = score.filter((match) => {
      const candidateReq = match.user.preference.minMatchRequirement ?? 1;

      if (match.score.candidateLikesUser < candidateReq) return false;
      if (match.score.userLikesCandidate < userReq) return false;

      return true;
    });

    if (qualifiedCandidates.length === 0) {
      const newlyAddedToPool = await this.addToMatchingPool(user);
      return { match: null, score, newlyAddedToPool };
    }

    const randomIndex = Math.floor(Math.random() * qualifiedCandidates.length);
    const matchedUserId = qualifiedCandidates[randomIndex].user.id;

    return { match: await this.assignMatch(user, matchedUserId) };
  }

  async countPotentialMatches(userId: string): Promise<{
    potentialMatchCount: number;
    outsidePreferenceCount: number;
    poolSize: number;
  }> {
    const user = await this.getRepository(User).findOneOrFail({
      where: { id: userId },
    });

    if (!user.preference) {
      user.preference = await this.createUserPreference(userId);
    }

    const candidateIds = await this.loadCandidates(user, 300);

    const candidates = (
      await this.getRepository(User).find({
        where: { id: In(candidateIds) },
      })
    ).map((candidate) => {
      if (!candidate.preference) {
        candidate.preference = new Preference();
      }

      return candidate;
    });

    const matchmaker = new Matchmaker(user);
    const score = matchmaker.score(candidates);

    let qualifiedCandidates = 0;
    let outsideUserPreference = 0;

    const userReq = user.preference.minMatchRequirement ?? 1;

    score.forEach((match) => {
      const candidateReq = match.user.preference.minMatchRequirement ?? 1;

      // If candidate likes user but user doesn't like candidate
      if (
        match.score.candidateLikesUser >= candidateReq &&
        match.score.userLikesCandidate <= userReq
      ) {
        outsideUserPreference++;
      }

      // If user likes candidate and candidate likes user
      if (
        match.score.userLikesCandidate >= userReq &&
        match.score.candidateLikesUser >= candidateReq
      ) {
        qualifiedCandidates++;
      }
    });

    return {
      potentialMatchCount: qualifiedCandidates,
      outsidePreferenceCount: outsideUserPreference,
      poolSize: candidateIds.length,
    };
  }

  async createUserPreference(id: string): Promise<Preference> {
    const p = new Preference();
    p.userId = id;

    return await this.getRepository(Preference).save(p);
  }

  /**
   * Updates the user preference based on the provided data.
   *
   * This method retrieves the user's submissions for the 'worldly-lifestyle' and
   * 'islamic-lifestyle' forms and checks if all questions in these forms are filled.
   * If not, it filters out fields from the provided data that should not be updated.
   *
   * @param id - The ID of the user whose preference is to be updated.
   * @param data - The data to update the user's preference with.
   * @returns A promise that resolves to the updated Preference entity.
   *
   * @throws Will throw an error if the user preference entity is not found.
   */
  async updateUserPreference(
    id: string,
    data: UpdatePreferenceDto,
  ): Promise<Preference> {
    const worldlyForm = await this.formService.findOneForm('worldly-lifestyle');
    const islamicForm = await this.formService.findOneForm('islamic-lifestyle');

    const worldlyOnlyFields = [
      'city',
      'country',
      'countryOfOrigin',
      'martialStatus',
      'children',
      'religiousPractice',
      'drinking',
      'drugs',
      'smoking',
      'tattoos',
      'bornOrRevert',
      'language',
      'nationality',
      'employmentType',
      'education',
    ];
    const islamicOnlyFields = ['salah', 'hijab', 'beard'];

    const worldlySubmission = await this.formService.getUserSubmission(
      'worldly-lifestyle',
      id,
    );
    const islamicSubmission = await this.formService.getUserSubmission(
      'islamic-lifestyle',
      id,
    );

    // Check if all questions in the worldly form are filled
    const worldlyLifestyleCompleted = worldlyForm?.fields.every((field) => {
      return worldlySubmission.some(
        (answer) => answer.fieldId === field.id && answer.value,
      );
    });

    // Check if all questions in the islamic form are filled
    const islamicLifestyleCompleted = islamicForm?.fields.every((field) => {
      return islamicSubmission.some(
        (answer) => answer.fieldId === field.id && answer.value,
      );
    });

    // Filter out fields that should not be updated
    const filteredData = { ...data };

    if (!worldlyLifestyleCompleted) {
      worldlyOnlyFields.forEach((field) => {
        if (field in filteredData) {
          delete filteredData[field];
        }
      });
    }

    if (!islamicLifestyleCompleted) {
      islamicOnlyFields.forEach((field) => {
        if (field in filteredData) {
          delete filteredData[field];
        }
      });
    }

    const preference = await this.getRepository(Preference).findOneOrFail({
      where: { userId: id },
    });

    // Merge the filtered data with the existing preference entity
    const updatedPreference = await this.getRepository(Preference).merge(
      preference,
      filteredData,
    );

    return await this.getRepository(Preference).save(updatedPreference);
  }

  async addToMatchingPool(user: User) {
    const pool = await this.getRepository(MatchPool).findOne({
      where: { userId: user.id },
    });

    if (pool) {
      return false;
    }

    const matchPoolEntry = await this.getRepository(MatchPool).save({
      ...user,
      userId: user.id,
    });

    const notificationPayload = {
      recipientId: user.id,
      userName: user.firstName,
      title: 'Added to Match Pool',
      message:
        'You have been added to the match pool. You will be notified when you are matched.',
    };

    const notification = new AddedToMatchPoolNotification(notificationPayload);
    await this.notificationService.send(notification);

    return matchPoolEntry;
  }

  async getActiveMatches(): Promise<Match[]> {
    return await this.getRepository(Match).find({ where: { isActive: true } });
  }

  async getAllMatches(): Promise<Match[]> {
    return await this.getRepository(Match).find({
      relations: ['maleUser', 'femaleUser', 'invitations', 'imageRequest'],
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
      relations: ['maleUser', 'femaleUser', 'invitations', 'imageRequest'],
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
      relations: ['maleUser', 'femaleUser', 'invitations', 'imageRequest'],
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

    const savedInvitation = await invitationRepo.save(invitation);

    // Trigger the notification
    const notification = new InviteToNextStageNotification(
      match.femaleUserId === user.id ? match.maleUser : match.maleUser,
      match,
    );
    await this.notificationService.send(notification);

    return savedInvitation;
  }

  async shareFamilyInfo(user: User) {
    const match = await this.getActiveMatch(user.id);

    if (!match) {
      throw new BadRequestException(
        'You are no longer matched with this user.',
      );
    }

    if (user.id !== match.femaleUserId && user.id !== match.maleUserId) {
      throw new ForbiddenException();
    }

    if (
      match.familyInformationExchangeStatus ===
      FamilyInformationExchangeStatus.EXCHANGED
    ) {
      throw new BadRequestException(
        'Family information has already been shared',
      );
    }

    // If Step 5 is reached, send family information to each other
    if (match.stage === MatchStage.FAMILY_INTRODUCTION) {
      const maleFamilyInfo = new FamilyInfoDto();
      const femaleFamilyInfo = new FamilyInfoDto();

      const maleUserFamily = await this.userService.getFamilyInformation(
        match.maleUserId,
      );

      const femaleUserFamily = await this.userService.getFamilyInformation(
        match.femaleUserId,
      );

      // Assign Information to the respective user
      maleFamilyInfo.guardianFirstName = maleUserFamily.guardianFirstName;
      maleFamilyInfo.guardianLastName = maleUserFamily.guardianLastName;
      maleFamilyInfo.relationshipToGuardian =
        maleUserFamily.relationshipToGuardian;
      maleFamilyInfo.guardianPhoneNumber = maleUserFamily.guardianPhoneNumber;
      maleFamilyInfo.guardianEmail = maleUserFamily.guardianEmail;
      maleFamilyInfo.guardianIdCard = maleUserFamily.guardianIdCard;
      maleFamilyInfo.recipientName = femaleUserFamily.guardianFirstName;
      maleFamilyInfo.matchedUserName = match.femaleUser.firstName;

      femaleFamilyInfo.guardianFirstName = femaleUserFamily.guardianFirstName;
      femaleFamilyInfo.guardianLastName = femaleUserFamily.guardianLastName;
      femaleFamilyInfo.relationshipToGuardian =
        femaleUserFamily.relationshipToGuardian;
      femaleFamilyInfo.guardianPhoneNumber =
        femaleUserFamily.guardianPhoneNumber;
      femaleFamilyInfo.guardianEmail = femaleUserFamily.guardianEmail;
      femaleFamilyInfo.guardianIdCard = femaleUserFamily.guardianIdCard;
      femaleFamilyInfo.recipientName = maleUserFamily.guardianFirstName;
      femaleFamilyInfo.matchedUserName = match.maleUser.firstName;

      // Send email to each other
      await this.noticeService.sendFamilyInformationEmail(
        maleFamilyInfo.guardianEmail,
        femaleFamilyInfo,
      );

      await this.noticeService.sendFamilyInformationEmail(
        femaleFamilyInfo.guardianEmail,
        maleFamilyInfo,
      );

      // female information sent to male notification
      const maleNotification = new FamilyInformationNotification({
        userName: match.femaleUser.firstName,
        senderGender: Gender.FEMALE,
        recipientId: match.maleUser.id,
        action: 'sent',
      });

      await this.notificationService.send(maleNotification);

      // male information sent to female notification
      const femaleNotification = new FamilyInformationNotification({
        userName: match.maleUser.firstName,
        senderGender: Gender.MALE,
        recipientId: match.femaleUser.id,
        action: 'sent',
      });

      await this.notificationService.send(femaleNotification);

      await this.getRepository(Match).update(match.id, {
        familyInformationExchangeStatus:
          FamilyInformationExchangeStatus.EXCHANGED,
      });

      return {
        maleUserId: match.maleUserId,
        femaleUserId: match.femaleUserId,
        matchId: match.id,
      };
    } else {
      throw new BadRequestException(
        'You are not at the family introduction stage',
      );
    }
  }

  async getInvitationById(
    invitationId: string,
  ): Promise<InvitationToMatchStage> {
    const invitation = await this.getRepository(InvitationToMatchStage).findOne(
      {
        where: { id: invitationId },
        relations: ['match'],
      },
    );

    if (!invitation) {
      throw new NotFoundException();
    }

    return invitation;
  }

  async acceptOrRejectMatchStageInvitation(
    invitationId: string,
    user: User,
    action: InvitationToMatchStageStatus,
  ) {
    const invitation = await this.getRepository(InvitationToMatchStage).findOne(
      {
        where: { id: invitationId },
        relations: ['match', 'match.maleUser', 'match.femaleUser'],
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

        // Send notification to inviter
        const inviter = await this.userService.getUserById(
          invitation.inviterId,
        );
        const acceptNotificationPayload: {
          recipientId: string;
          userName: string;
          action: 'accepted' | 'rejected';
        } = {
          recipientId: inviter.id,
          userName:
            invitation.match.femaleUserId === user.id
              ? invitation.match.femaleUser.firstName
              : invitation.match.maleUser.firstName,
          action: 'accepted',
        };

        const notification = new ResponseInviteNotification(
          acceptNotificationPayload,
        );
        await this.notificationService.send(notification);

        break;
      case InvitationToMatchStageStatus.REJECTED:
        invitation.status = InvitationToMatchStageStatus.REJECTED;
        invitation.acceptedOrRejectedAt = now;
        await this.getRepository(InvitationToMatchStage).save(invitation);

        // Send notification to inviter
        const inviterReject = await this.userService.getUserById(
          invitation.inviterId,
        );
        const rejectNotificationPayload: {
          recipientId: string;
          userName: string;
          action: 'accepted' | 'rejected';
        } = {
          recipientId: inviterReject.id,
          userName:
            invitation.match.femaleUserId === user.id
              ? invitation.match.femaleUser.firstName
              : invitation.match.maleUser.firstName,
          action: 'rejected',
        };

        const rejectNotification = new ResponseInviteNotification(
          rejectNotificationPayload,
        );
        await this.notificationService.send(rejectNotification);

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

  async toggleMatchUserProfile(
    userId: string,
    matchId: string,
    dto: AllowMatchUserProfileDto,
  ) {
    const match = await this.getMatch(matchId);

    if (!match.isActive) {
      throw new BadRequestException('Match is inactive');
    }

    if (match.maleUserId !== userId && match.femaleUserId !== userId) {
      throw new UnauthorizedException();
    }

    if (dto.status) {
      match.allowMatchedUserView = true;
    } else {
      match.allowMatchedUserView = false;
    }

    return await this.getRepository(Match).save(match);
  }

  async toggleMatchChat(
    userId: string,
    matchId: string,
    dto: AllowMatchChatDto,
  ) {
    const match = await this.getMatch(matchId);

    if (!match.isActive) {
      throw new BadRequestException('Match is inactive');
    }

    if (match.maleUserId !== userId && match.femaleUserId !== userId) {
      throw new UnauthorizedException();
    }

    if (dto.status) {
      match.allowChatView = true;
    } else {
      match.allowChatView = false;
    }

    return await this.getRepository(Match).save(match);
  }
}
