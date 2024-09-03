import { Module } from '@nestjs/common';

import { S3Client } from '@aws-sdk/client-s3';



import { StorageController } from './controllers/storage.controller';
import { AwsS3 } from './services/aws-s3.service';
import { StorageService } from './services/storage.service';
import { S3 } from './types';



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
        //   endpoint: process.env.AWS_ENDPOINT,
        region: process.env.AWS_REGION,
          forcePathStyle: true,
        });
      },
    },

    {
      provide: S3,
      useClass: AwsS3,
    },

    StorageService,
  ],
  controllers: [StorageController],
  exports: [StorageService],
})
export class StorageModule {}