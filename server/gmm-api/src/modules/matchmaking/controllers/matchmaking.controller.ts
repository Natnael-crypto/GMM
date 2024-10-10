import {
  BadRequestException,
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
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Request, Response } from 'express';
import { User } from '@modules/user/entities/user.entity';
import {
  Filtering,
  FilteringParams,
} from '@shared/decorators/filter.decorator';
import { matchFilterableFields } from '../entities/match-pool.entity';
import { PermissionGuard } from '@modules/auth/guards/permission.guard';
import { StageInvitationStatus } from '../entities/match-invitation.entity';
import { AcceptOrRejectInvitationDto } from '../dtos/invitation.dto';

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

  @ApiQuery({
    name: 'filter',
    required: false,
    description: 'Filter parameters (e.g. filter=field:rule:value,field:rule)',
  })
  @Get('count')
  async countMatches(
    @FilteringParams(matchFilterableFields) filters: Filtering[],
  ) {
    try {
      const count = await this.matchmakingService.countMatches(filters);
      return {
        message: 'Matches count fetched successfully',
        data: count,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiQuery({
    name: 'filter',
    required: false,
    description: 'Filter parameters (e.g. filter=field:rule:value,field:rule)',
  })
  @Post()
  async createMatches(
    @FilteringParams(matchFilterableFields) filters: Filtering[],
    @Req() req: Request & { user: User },
  ) {
    try {
      const match = await this.matchmakingService.matchUser(req.user, filters);
      return {
        message: 'Matched successfully',
        data: match,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put('add-to-pool')
  async addToMatchingPool(@Req() req: Request & { user: User }) {
    try {
      await this.matchmakingService.addToMatchingPool(req.user);
      return {
        message: 'Added to matching pool successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('users-in-pool')
  async getUsersInMatchPool(@Res() response: Response) {
    try {
      const matches = await this.matchmakingService.getUsersInMatchPool();
      return response.status(HttpStatus.OK).json({
        message: 'Users in match pool fetched successfully',
        data: matches,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to fetch users in the match pool',
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

  @UseGuards(JwtAuthGuard, new PermissionGuard(['match:read']))
  @Get('all-matches')
  async getAllMatches(@Res() response: Response) {
    try {
      const matches = await this.matchmakingService.getAllMatches();
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

  @UseGuards(JwtAuthGuard, new PermissionGuard(['match:read']))
  @Get('previous-matches')
  async getPreviousMatches(@Res() response: Response) {
    try {
      const matches = await this.matchmakingService.getPreviousMatches();
      return response.status(HttpStatus.OK).json({
        message: 'Previous Matches fetched successfully',
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

  @Post('matches/:id/stage-invitation')
  async inviteToNextStage(
    @Param('id') id: string,
    @Req() request: Request & { user: User },
    @Res() response: Response,
  ) {
    try {
      const match = await this.matchmakingService.inviteToNextStage(
        id,
        request.user,
      );
      return response.status(HttpStatus.OK).json({
        message: 'You have invited your match to next stage',
        data: match,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
  @ApiBody({
    type: AcceptOrRejectInvitationDto,
  })
  @Put('matches/:id/stage-invitation')
  async acceptOrRejectInvitation(
    @Param('id') id: string,
    @Body() dto: AcceptOrRejectInvitationDto,
    @Req() request: Request & { user: User },
    @Res() response: Response,
    g,
  ) {
    try {
      const match =
        await this.matchmakingService.acceptOrRejectMatchStageInvitation(
          id,
          request.user,
          dto.action,
        );
      return response.status(HttpStatus.OK).json({
        message: 'You have invited your match to next stage',
        data: match,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
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
