import {
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VerificationService } from '../services/verification.service';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { User } from '@modules/user/entities/user.entity';

@ApiTags('verification')
@ApiBearerAuth()
@Controller('verification')
@UseGuards(JwtAuthGuard)
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post('liveness')
  public async createFaceLivenessSession(@Req() req: Request & { user: User }) {
    const sessionId = await this.verificationService.createFaceLivenessSession(
      req.user.id,
    );

    if (sessionId) {
      return {
        data: sessionId,
      };
    } else {
      throw new InternalServerErrorException('Failed to create session');
    }
  }

  @Get('liveness')
  public async getFaceLivenessStatus(@Req() req: Request & { user: User }) {
    const status =
      await this.verificationService.getFaceLivenessVerificationStatus(
        req.user.id,
      );

    return {
      data: status,
    };
  }
}
