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
import { MatchMakingService } from '../services/matchmaking.service';
import { UpdatePreferenceDto } from '../dtos/preference.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { User } from '@modules/user/entities/user.entity';

@ApiTags('matchmaking')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('matchmaking')
export class MatchMakingController {
  constructor(private readonly matchmakingService: MatchMakingService) {}

  @Put('preference')
  async updatePreference(
    @Body() preference: UpdatePreferenceDto,
    @Req() req: Request,
  ) {
    return this.matchmakingService.updateUserPreference(
      (req.user as User).id,
      preference,
    );
  }

  @Post()
  async createMatch(@Req() req: Request) {
    return this.matchmakingService.createMatch((req.user as User).id);
  }

  @Get()
  async getMatches(@Req() req: Request) {
    return await this.matchmakingService.getMatches((req.user as User).id);
  }

  @Get(':id')
  async getMatch(@Param('id') id: string) {
    return await this.matchmakingService.getMatch(id);
  }

  @Get('current-match')
  async getCurrentMatch(@Req() req: Request) {
    return await this.matchmakingService.getCurrentMatch((req.user as User).id);
  }
}
