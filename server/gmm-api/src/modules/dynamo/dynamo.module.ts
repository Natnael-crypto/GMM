import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AwsConfig } from '@shared/config';
import * as dynamoose from 'dynamoose';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'DYNAMOOSE',
      useFactory: (configService: ConfigService) => {
        const { accessKeyId, secretAccessKey, region } =
          configService.get<AwsConfig>('aws')!;

        if (!accessKeyId || !secretAccessKey || !region) {
          throw new Error(
            'Missing necessary AWS configuration in environment variables.',
          );
        }

        const dynamoDBClient = new dynamoose.aws.ddb.DynamoDB({
          region,
          credentials: {
            accessKeyId,
            secretAccessKey,
          },
        });

        dynamoose.aws.ddb.set(dynamoDBClient);

        return dynamoose;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DYNAMOOSE'],
})
export class DynamooseModule {}
