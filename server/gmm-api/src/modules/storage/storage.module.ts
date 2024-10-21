import { Module } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { StorageController } from './controllers/storage.controller';
import { StorageService } from './services/storage.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AwsConfig } from '@shared/config';

@Module({
  imports: [ConfigModule],

  providers: [
    {
      provide: S3Client,
      useFactory: async (configService: ConfigService) => {
        const { accessKeyId, secretAccessKey, region } =
          configService.get<AwsConfig>('aws')!;

        return new S3Client({
          credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
          },
          region: region,
          forcePathStyle: true,
        });
      },
      inject: [ConfigService],
    },

    StorageService,
  ],
  controllers: [StorageController],
  exports: [StorageService],
})
export class StorageModule {}
