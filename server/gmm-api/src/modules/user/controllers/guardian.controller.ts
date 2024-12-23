import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestGuardianDto } from '../dtos/guardian.dto';
import { GuardianService } from '../services/guardian.service';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { User } from '../entities/user.entity';
import { UserSpecificCacheInterceptor } from '@shared/interceptors/cache.interceptor';

@ApiTags('Guardian')
@ApiBearerAuth()
@Controller('guardians')
export class GuardianController {
  constructor(
    private readonly guardianService: GuardianService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

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

    const keys = [
      `/guardians/sent-requests/${user.id}`,
    ]

    await Promise.all(
      keys.map((key) => this.cacheManager.del(key)),
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
  @UseInterceptors(UserSpecificCacheInterceptor)
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
