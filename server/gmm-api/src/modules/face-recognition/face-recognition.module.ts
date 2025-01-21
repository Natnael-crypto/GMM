import { RekognitionClient } from '@aws-sdk/client-rekognition';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsConfig } from '@shared/config';
import { FaceRecognitionService } from './services/face-recognition.service';

@Module({
  providers: [
    {
      provide: RekognitionClient,
      useFactory: async (configService: ConfigService) => {
        const { accessKeyId, secretAccessKey, region } =
          configService.get<AwsConfig>('aws')!;

        return new RekognitionClient({
          credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
          },
          region: region,
        });
      },
      inject: [ConfigService],
    },

    FaceRecognitionService,
  ],

  exports: [FaceRecognitionService],
})
export class FaceRecognitionModule {}
