import {
  Body,
  Controller,
  Delete,
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
    try {
      const match = await this.matchmakingService.createMatch(req.user as User);
      return response.status(HttpStatus.CREATED).json({
        message: 'Match created successfully',
        data: match,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Match not created successfully',
        error: error.message,
      });
    }
  }

  @Get()
  async getMyMatches(@Req() req: Request, @Res() response: Response) {
    try {
      const matches = await this.matchmakingService.getMyMatches(
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
  
  @Get()
  async getCurrentMatches(@Res() response: Response) {
    try {
      const matches = await this.matchmakingService.getCurrentMatches();
      return response.status(HttpStatus.OK).json({
        message: 'Current Matches fetched successfully',
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

  @Delete('matches/:id')
  async unmatchByAdmin(@Param('id') id: string, @Res() response: Response) {
    try {
      await this.matchmakingService.unmatchByMatchId(id);
      return response.status(HttpStatus.OK).json({
        message: 'Match deleted successfully',
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to delete match',
        error: error.message,
      });
    }
  }

  @Put('filter')
  async unmatch(@Req() req: Request, @Res() response: Response) {
    try {
      const users = await this.matchmakingService.filterUsersByPreference(
        req.user as User,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Users fetched successfully',
        data: users,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to fetch users',
        error: error.message,
      });
    }
  }
}
