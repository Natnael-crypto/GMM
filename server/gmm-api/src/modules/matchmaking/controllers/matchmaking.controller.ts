import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MatchMakingService } from '../services/matchmaking.service';
import { UpdatePreferenceDto } from '../dtos/preference.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Request, Response } from 'express';
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
    @Res() response: Response,
  ) {
    try {
      const pref = await this.matchmakingService.updateUserPreference(
        (req.user as User).id,
        preference,
      );

      return response.status(HttpStatus.OK).json({
        message: 'User preference updated successfully',
        data: pref,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to update user preference',
        error: error.message,
      });
    }
  }

  @Post()
  async createMatch(@Req() req: Request, @Res() response: Response) {
    const match = await this.matchmakingService.createMatch(
      (req.user as User).id,
    );
    return response.status(HttpStatus.CREATED).json({
      message: 'Match created successfully',
      data: match,
    });
  }

  @Get()
  async getMatches(@Req() req: Request, @Res() response: Response) {
    try {
      const matches = await this.matchmakingService.getMatches(
        (req.user as User).id,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Matches fetched successfully',
        data: matches,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to fetch matches',
        error: error.message,
      });
    }
  }

  @Get('matches/:id')
  async getMatch(@Param('id') id: string, @Res() response: Response, g) {
    try {
      const match = await this.matchmakingService.getMatch(id);
      return response.status(HttpStatus.OK).json({
        message: 'Match fetched successfully',
        data: match,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to fetch match',
        error: error.message,
      });
    }
  }

  @Get('current-match')
  async getCurrentMatch(@Req() req: Request, @Res() response: Response) {
    try {
      const match = await this.matchmakingService.getCurrentMatch(
        (req.user as User).id,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Current match fetched successfully',
        data: match,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to fetch current match',
        error: error.message,
      });
    }
  }
}
