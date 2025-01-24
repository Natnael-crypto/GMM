import {
  BadRequestException,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseRepository } from '@shared/base-repository';
import { DataSource } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { ImageAccessRequest } from '../entities/image-access-request.entity';
import { MatchMakingService } from './matchmaking.service';
import { ImageAccessRequestStatus } from '../enums/request-status.enum';
import { ImageAccessRequestNotification } from '@modules/notifications/notifications/image-access-request.notification';
import { NotificationService } from '@modules/notifications/services/notification.service';
import {
  ImageAccessRequestPayload,
  ImageRequestNotificationPayload,
} from '../interfaces/matchmaking.interface';
import { ImageAccessRequestDto } from '../dtos/image-access-request.dto';

@Injectable({ scope: Scope.REQUEST })
export class ImageAccessRequestService extends BaseRepository {
  constructor(
    private readonly matchMakingService: MatchMakingService,
    private readonly notificationService: NotificationService,
    @Inject(REQUEST) req: Request,
    dataSource: DataSource,
  ) {
    super(dataSource, req);
  }

  /**
   * Creates an image access request for a given match ID.
   *
   * This method retrieves the active match for the provided user ID and checks if an image access request
   * already exists for that match. If it does not exist, a new image access request is created and saved.
   * If it does exist, the status of the existing request is updated to PENDING and saved.
   *
   * Additionally, a notification is sent to the recipient of the image access request.
   *
   * @param id - The ID of the user requesting image access.
   * @returns A promise that resolves to the created or updated ImageAccessRequest.
   *
   * @throws Will throw an error if the match cannot be retrieved or if there is an issue saving the request.
   */
  async createImageAccessRequest(
    id: string,
    userId: string,
  ): Promise<ImageAccessRequest> {
    const currentMatch = await this.matchMakingService.getActiveMatch(id);

    if (userId !== currentMatch.maleUserId) {
      throw new UnauthorizedException();
    }

    const imageAccessRequest = await this.getRepository(
      ImageAccessRequest,
    ).findOneBy({
      matchId: currentMatch.id,
    });

    const imageRequestNotificationPayload: ImageRequestNotificationPayload = {
      recipientId: currentMatch.femaleUserId,
      userName: currentMatch.maleUser.firstName,
      action: 'requested',
    };

    const notification = new ImageAccessRequestNotification(
      imageRequestNotificationPayload,
    );

    let response: ImageAccessRequest;

    if (!imageAccessRequest) {
      const newImageAccessRequest = new ImageAccessRequest();
      newImageAccessRequest.userId = id;
      newImageAccessRequest.matchId = currentMatch.id;

      response = await this.getRepository(ImageAccessRequest).save(
        newImageAccessRequest,
      );
    } else {
      imageAccessRequest.status = ImageAccessRequestStatus.PENDING;
      response =
        await this.getRepository(ImageAccessRequest).save(imageAccessRequest);
    }

    await this.notificationService.send(notification);

    return response;
  }

  /**
   * Updates the status of an image access request and sends a notification based on the new status.
   *
   * @param id - The unique identifier of the image access request.
   * @param payload - The payload containing the new status of the image access request.
   * @returns The updated image access request entity.
   * @throws {BadRequestException} If the image access request is not in a pending state.
   */
  async updateImageAccessRequest(
    id: string,
    userId: string,
    payload: ImageAccessRequestDto,
  ) {
    const imageAccessRequest = await this.getRepository(
      ImageAccessRequest,
    ).findOneByOrFail({
      id: id,
    });

    if (userId !== imageAccessRequest.match.femaleUserId) {
      throw new UnauthorizedException();
    }

    if (imageAccessRequest.status !== ImageAccessRequestStatus.PENDING) {
      throw new BadRequestException(
        `Image request access is already ${imageAccessRequest.status}`,
      );
    }

    const currentMatch = await this.matchMakingService.getActiveMatch(
      imageAccessRequest.matchId,
    );

    const imageRequestNotificationPayload: ImageRequestNotificationPayload = {
      recipientId: currentMatch.maleUserId,
      userName: currentMatch.femaleUser.firstName,
      action: 'requested',
    };

    if (payload.status === 'accepted') {
      imageAccessRequest.status = ImageAccessRequestStatus.ACCEPTED;
      imageRequestNotificationPayload.action = 'accepted';
    } else {
      imageAccessRequest.status = ImageAccessRequestStatus.REJECTED;
      imageRequestNotificationPayload.action = 'rejected';
    }

    const response =
      await this.getRepository(ImageAccessRequest).save(imageAccessRequest);

    const notification = new ImageAccessRequestNotification(
      imageRequestNotificationPayload,
    );

    await this.notificationService.send(notification);

    return response;
  }

  /**
   * Retrieves an ImageAccessRequest by its ID.
   *
   * @param {string} id - The unique identifier of the ImageAccessRequest.
   * @returns {Promise<ImageAccessRequest>} A promise that resolves to the ImageAccessRequest object.
   * @throws Will throw an error if no ImageAccessRequest is found with the given ID.
   */
  async getImageAccessRequest(
    id: string,
    userId: string,
  ): Promise<ImageAccessRequest> {
    const imageAccess = await this.getRepository(
      ImageAccessRequest,
    ).findOneByOrFail({
      id: id,
    });

    if (
      userId !== imageAccess.match.maleUserId &&
      userId !== imageAccess.match.femaleUserId
    ) {
      throw new UnauthorizedException();
    }

    return imageAccess;
  }
}
