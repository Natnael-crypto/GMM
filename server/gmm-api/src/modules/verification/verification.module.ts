import { FaceRecognitionModule } from '@modules/face-recognition/face-recognition.module';
import { Module } from '@nestjs/common';
import { VerificationController } from './controllers/verification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verification } from './entities/verification.entity';
import { VerificationService } from './services/verification.service';

@Module({
  imports: [TypeOrmModule.forFeature([Verification]), FaceRecognitionModule],
  providers: [VerificationService],
  controllers: [VerificationController],
})
export class VerificationModule {}
