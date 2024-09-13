import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { GuardianRequest } from '../entities/guardian-request.entity';

@Injectable()
export class GuardianService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(GuardianRequest)
    private readonly guardianRequestRepository: Repository<GuardianRequest>,
  ) {}

  async requestGuardian(userId: string, guardianId: string) {
    if (userId === guardianId) {
      throw new ConflictException('User cannot be their own guardian');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (user.guardianId) {
      throw new ConflictException('User already has a guardian');
    }

    const guardian = await this.userRepository.findOne({
      where: { id: guardianId },
    });
    if (!guardian) {
      throw new NotFoundException(`Guardian with ID ${guardianId} not found`);
    }

    return await this.guardianRequestRepository.save({
      user,
      guardian,
    });
  }

  async acceptGuardianRequest(requestId: string, requestInitiatorId: string) {
    const request = await this.guardianRequestRepository.findOne({
      where: { id: requestId },
    });
    if (!request) {
      throw new NotFoundException(`Request with ID ${requestId} not found`);
    }

    if (request.guardianId !== requestInitiatorId) {
      throw new NotAcceptableException(
        'User does not have permission to accept guardian request',
      );
    }

    request.accepted = true;
    await this.guardianRequestRepository.save(request);

    return await this.assignGuardian(request.userId, request.guardianId);
  }

  private async assignGuardian(userId: string, guardianId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const guardian = await this.userRepository.findOne({
      where: { id: guardianId },
    });
    if (!guardian) {
      throw new NotFoundException(`Guardian with ID ${guardianId} not found`);
    }

    if (user.guardian) {
      throw new ConflictException('User already has a guardian');
    }

    user.guardian = guardian;
    return await this.userRepository.save(user);
  }

  async removeGuardian(userId: string, requestInitiatorId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (!user.guardianId) {
      throw new ConflictException('User does not have a guardian');
    }

    if (
      user.id === requestInitiatorId ||
      user.guardianId === requestInitiatorId
    ) {
      user.guardian = null;
      return await this.userRepository.save(user);
    }

    throw new NotAcceptableException(
      'User does not have permission to remove guardian',
    );
  }
}
