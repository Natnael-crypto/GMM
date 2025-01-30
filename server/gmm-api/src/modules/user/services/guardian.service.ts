import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import {
  GuardianRequest,
  GuardianRequestStatus,
} from '../entities/guardian-request.entity';
import { NoticeService } from '@modules/notice/services/notice.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GuardianRequestedEvent } from '../events/guardian.events';
import { RequestGuardianDto } from '../dtos/guardian.dto';

@Injectable()
export class GuardianService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(GuardianRequest)
    private readonly guardianRequestRepository: Repository<GuardianRequest>,
    private readonly noticeService: NoticeService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async requestGuardian(user: User, dto: RequestGuardianDto) {
    if (user.email === dto.email) {
      throw new ConflictException('User cannot be their own guardian');
    }

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    if (user.guardianId) {
      throw new ConflictException('User already has a guardian');
    }

    const guardian = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    const pendingRequests = await this.guardianRequestRepository.find({
      where: {
        userId: user.id,
        guardianEmail: dto.email,
        status: GuardianRequestStatus.PENDING,
      },
    });

    if (pendingRequests.length !== 0) {
      throw new ConflictException('Request already sent to this guardian');
    }

    await this.guardianRequestRepository.save({
      user,
      guardianEmail: dto.email,
      relationshipToGuardian: dto.relationshipToGuardian,
    });

    if (!guardian) {
      this.eventEmitter.emit(
        GuardianRequestedEvent.name,
        new GuardianRequestedEvent(user, dto, dto.relationshipToGuardian),
      );

      return 'Guardian is not registered at Guardian/Wali. Registration request has been sent to their email successfully.';
    }

    await this.noticeService.sendEmail(
      dto.email,
      'Guardian Request',
      `Hello. ${user.firstName} ${user.lastName} has requested you to be their guardian. Please login to your Guardian/Wali account to accept the request.`,
    );

    return 'Guardian request sent successfully';
  }

  async getReceivedGuardianRequests(user: User) {
    return await this.guardianRequestRepository.find({
      where: { guardianEmail: user.email },
      relations: ['user'],
    });
  }

  async getSentGuardianRequests(user: User) {
    return await this.guardianRequestRepository.find({
      where: { userId: user.id },
      relations: ['user'],
    });
  }

  async acceptGuardianRequest(requestId: string, user: User) {
    const request = await this.guardianRequestRepository.findOne({
      where: { id: requestId },
      relations: ['user'],
    });

    if (!request) {
      throw new NotFoundException(`Request with ID ${requestId} not found`);
    }

    if (request.status !== GuardianRequestStatus.PENDING) {
      throw new NotAcceptableException('Request has expired.');
    }

    if (request.guardianEmail !== user.email) {
      throw new ForbiddenException(
        'You are not authorized to reject this request',
      );
    }

    await this.assignGuardian(request.user, request.guardianEmail);

    request.status = GuardianRequestStatus.ACCEPTED;
    request.acceptedAt = new Date();

    await this.guardianRequestRepository.save(request);
  }

  async rejectGuardianRequest(requestId: string, user: User) {
    const request = await this.guardianRequestRepository.findOne({
      where: { id: requestId },
      relations: ['user'],
    });

    if (!request) {
      throw new NotFoundException(`Request with ID ${requestId} not found`);
    }

    if (request.guardianEmail !== user.email) {
      throw new ForbiddenException(
        'You are not authorized to reject this request',
      );
    }

    if (request.status !== GuardianRequestStatus.PENDING) {
      throw new NotAcceptableException('Request has expired.');
    }

    request.status = GuardianRequestStatus.REJECTED;
    request.rejectedAt = new Date();

    await this.guardianRequestRepository.save(request);
  }

  private async assignGuardian(user: User, guardianEmail: string) {
    const guardian = await this.userRepository.findOne({
      where: { email: guardianEmail },
    });

    if (!guardian) {
      throw new NotFoundException(`Guardian is not registered yet.`);
    }

    if (user.guardian) {
      throw new ConflictException('User already has a guardian');
    }

    user.guardian = guardian;
    return await this.userRepository.save(user);
  }

  async removeGuardian(user: User) {
    if (!user.guardianId) {
      throw new ConflictException('User does not have a guardian');
    }

    user.guardian = null;
    return await this.userRepository.save(user);
  }

  async getGuardianUsers(guardianId) {
    return await this.userRepository.find({
      where: { guardianId },
    });
  }
}
