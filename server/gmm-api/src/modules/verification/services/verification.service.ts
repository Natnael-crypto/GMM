import { FaceRecognitionService } from '@modules/face-recognition/services/face-recognition.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Verification } from '../entities/verification.entity';
import { Repository } from 'typeorm';
import {
  VerificationStatus,
  VerificationType,
} from '../enum/verification.enum';

@Injectable()
export class VerificationService {
  constructor(
    private readonly faceRecognitionService: FaceRecognitionService,
    @InjectRepository(Verification)
    private verificationRepository: Repository<Verification>,
  ) {}

  public async createFaceLivenessSession(userId: string) {
    const sessionId =
      await this.faceRecognitionService.createFaceLivenessSession();

    if (sessionId) {
      await this.verificationRepository.save({
        userId,
        type: VerificationType.FACE_LIVENESS,
        status: VerificationStatus.PENDING,
        extra: { sessionId },
      });

      return sessionId;
    }
  }

  public async getFaceLivenessVerificationStatus(userId: string) {
    const verificationAttempts = await this.verificationRepository.find({
      where: { userId, type: VerificationType.FACE_LIVENESS },
    });

    const verification = verificationAttempts.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )[0];

    if (!verification) {
      return VerificationStatus.NOT_INITIATED;
    }
    if (
      verification.status === VerificationStatus.PENDING &&
      verification.extra
    ) {
      const result = await this.faceRecognitionService.getSessionResult(
        verification.extra.sessionId,
      );

      if (result?.completed) {
        if (result?.isLive) {
          verification.status = VerificationStatus.APPROVED;
        } else {
          verification.status = VerificationStatus.REJECTED;
        }

        await this.verificationRepository.save(verification);
      }
    }

    return verification.status;
  }
}
