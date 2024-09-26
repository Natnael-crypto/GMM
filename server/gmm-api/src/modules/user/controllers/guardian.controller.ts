import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestGuardianDto } from '../dtos/guardian.dto';
import { GuardianService } from '../services/guardian.service';

@ApiTags('Guardian')
@ApiBearerAuth()
@Controller('guardians')
export class GuardianController {
  constructor(private readonly guardianService: GuardianService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async requestGuardian(
    @Body() guardianDto: RequestGuardianDto,
    @Req() req: Request & { user: any },
  ) {
    const user = req.user;
    const message = await this.guardianService.requestGuardian(
      user,
      guardianDto,
    );

    return {
      message,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('received-requests')
  async getReceivedGuardianRequests(@Req() req: Request & { user: any }) {
    const request = await this.guardianService.getReceivedGuardianRequests(
      req.user,
    );

    return {
      message: 'Guardian requests fetched successfully',
      data: request,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('sent-requests')
  async getSentGuardianRequests(@Req() req: Request & { user: any }) {
    const request = await this.guardianService.getSentGuardianRequests(
      req.user,
    );

    return {
      message: 'Guardian requests fetched successfully',
      data: request,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':requestId/accept')
  async acceptRequest(
    @Param('requestId') requestId: string,
    @Req() req: Request & { user: any },
  ) {
    const user = req.user;

    await this.guardianService.acceptGuardianRequest(requestId, user);

    return {
      message: 'Guardian request accepted successfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':requestId/reject')
  async rejectRequest(
    @Param('requestId') requestId: string,
    @Req() req: Request & { user: any },
  ) {
    const user = req.user;

    await this.guardianService.rejectGuardianRequest(requestId, user);

    return {
      message: 'Guardian request accepted successfully',
    };
  }
}
