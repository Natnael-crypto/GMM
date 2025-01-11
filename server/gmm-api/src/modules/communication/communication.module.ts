import { Module } from '@nestjs/common';
import { LambdaFactory } from './services/lambda-factory.service';
import { LambdaService } from './services/lambda.service';

@Module({
  providers: [LambdaFactory, LambdaService],
  exports: [LambdaService],
})
export class CommunicationModule {}
