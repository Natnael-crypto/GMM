import {
  CreateFaceLivenessSessionCommand,
  GetFaceLivenessSessionResultsCommand,
  RekognitionClient,
} from '@aws-sdk/client-rekognition';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsConfig } from '@shared/config';

@Injectable()
export class FaceRecognitionService {
  constructor(
    private readonly rekognition: RekognitionClient,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Creates a Face Liveness Session
   * @returns Result of the Face Liveness Session creation
   */
  public async createFaceLivenessSession() {
    const cmd = new CreateFaceLivenessSessionCommand({
      Settings: {
        OutputConfig: {
          S3Bucket: this.configService.get<AwsConfig>('aws')?.s3?.bucketName,
          S3KeyPrefix: 'face-liveness/',
        },
      },
    });
    try {
      const response = await this.rekognition.send(cmd);
      return response.SessionId;
    } catch (error) {}
  }

  /**
   * Gets the result of a Face Liveness Session
   * @param sessionId The ID of the Face Liveness Session
   * @param confidenceThreshold The confidence threshold for the result
   * @returns Result of the Face Liveness Session
   */
  public async getSessionResult(
    sessionId: string,
    confidenceThreshold: number = 70,
  ) {
    const cmd = new GetFaceLivenessSessionResultsCommand({
      SessionId: sessionId,
    });

    let isLive = false;
    let completed = false;

    try {
      const result = await this.rekognition.send(cmd);
      console.log({ aws: result });

      if (result) {
        completed =
          result.Status === 'SUCCEEDED' ||
          result.Status === 'FAILED' ||
          result.Status === 'EXPIRED';
      }

      if (result.Confidence && result.Confidence > confidenceThreshold) {
        if (result.Status === 'SUCCEEDED') {
          isLive = true;
        }
      } else {
        isLive = false;
      }
    } catch (err) {}

    return {
      isLive,
      completed,
    };
  }
}
