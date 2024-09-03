import { Module } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { StorageController } from './controllers/storage.controller';
import { StorageService } from './services/storage.service';

@Module({
  providers: [
    // Inject AWS Dependency
    {
      provide: S3Client,
      useFactory: () => {
        return new S3Client({
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
          },
          endpoint: process.env.AWS_ENDPOINT,
          region: process.env.AWS_REGION,
          forcePathStyle: true,
        });
      },
    },

    StorageService,
  ],
  controllers: [StorageController],
  exports: [StorageService],
})
export class StorageModule {}
