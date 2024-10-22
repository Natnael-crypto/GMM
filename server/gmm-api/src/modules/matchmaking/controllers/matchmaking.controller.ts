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
  Query,
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
import { PermissionGuard } from '@modules/auth/guards/permission.guard';
import { AcceptOrRejectInvitationDto } from '../dtos/invitation.dto';

@ApiTags('matchmaking')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('matchmaking')
export class MatchMakingController {
  constructor(private readonly matchmakingService: MatchMakingService) {}

  @ApiBody({
    type: UpdatePreferenceDto,
    required: true,
  })
  @Put('preference')
  async updatePreference(
    @Body() preference: UpdatePreferenceDto,
    @Req() req: Request,    
  ) {
    try {
      const pref = await this.matchmakingService.updateUserPreference(
        (req.user as User).id,
        preference,
      );

      return {
        message: 'User preference updated successfully',
        data: pref,
      };
    } catch (error) {
      return {
        message: 'Failed to update user preference',
        error: error.message,
      };
    }
  }

  @ApiQuery({
    name: 'min_requirement',
    required: false,
    description: 'Fuzzy search threshold',
  })
  @Post()
  async match(
    @Query('min_requirement') minRequirement: string,
    @Req() req: Request & { user: User },
  ) {
    try {
      const threshold = parseFloat(minRequirement);
      const match = await this.matchmakingService.matchUser(
        req.user,
        isNaN(threshold) ? 0 : threshold,
      );
      return {
        message: 'Matched successfully',
        data: match,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('matches/:id/invitations')
  async inviteToNextStage(
    @Param('id') id: string,
    @Req() request: Request & { user: User },
  ) {
    try {
      const match = await this.matchmakingService.inviteToNextStage(
        id,
        request.user,
      );
      return {
        message: 'You have invited your match to next stage',
        data: match,
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  @Get()
  async getUserMatches(@Req() req: Request) {
    try {
      const matches = await this.matchmakingService.getUserMatches(
        (req.user as User).id,
      );
      return {
        message: 'Matches fetched successfully',
        data: matches,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch matches',
        error: error.message,
      };
    }
  }

  @Get('current-match')
  async getMyActiveMatch(@Req() req: Request) {
    try {
      const match = await this.matchmakingService.getActiveMatch(
        (req.user as User).id,
      );
      return {
        message: 'Current match fetched successfully',
        data: match,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch current match',
        error: error.message,
      };
    }
  }

  @Delete('current-match')
  async unmatch(@Req() req: Request) {
    try {
      const match = await this.matchmakingService.unmatchByUserId(
        (req.user as User).id,
      );
      return {
        message: 'Successfully unmatched',
        data: match,
      };
    } catch (error) {
      return {
        message: 'Failed to unmatch',
        error: error.message,
      };
    }
  }

  @Get('matches/:id')
  async getMatch(@Param('id') id: string) {
    try {
      const match = await this.matchmakingService.getMatch(id);
      return {
        message: 'Match fetched successfully',
        data: match,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch match',
        error: error.message,
      };
    }
  }

  @ApiBody({
    type: AcceptOrRejectInvitationDto,
  })
  @Put('matches/invitations/:id')
  async acceptOrRejectInvitation(
    @Param('id') id: string,
    @Body() dto: AcceptOrRejectInvitationDto,
    @Req() request: Request & { user: User },
  ) {
    try {
      const match =
        await this.matchmakingService.acceptOrRejectMatchStageInvitation(
          id,
          request.user,
          dto.action,
        );
      return {
        message: 'You have invited your match to next stage',
        data: match,
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  /** ADMIN ROUTES */
  @UseGuards(JwtAuthGuard, new PermissionGuard(['match:read']))
  @Get('matches')
  async getAllMatches(@Res() response: Response) {
    try {
      const matches = await this.matchmakingService.getAllMatches();
      return {
        message: 'Matches fetched successfully',
        data: matches,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch matches',
        error: error.message,
      };
    }
  }

  @Get()
  async getActiveMatches(@Res() response: Response) {
    try {
      const matches = await this.matchmakingService.getActiveMatches();
      return {
        message: 'Current Matches fetched successfully',
        data: matches,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch matches',
        error: error.message,
      };
    }
  }

  @Get('pool')
  async getUsersInMatchPool(@Res() response: Response) {
    try {
      const matches = await this.matchmakingService.getUsersInMatchPool();
      return {
        message: 'Users in match pool fetched successfully',
        data: matches,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch users in the match pool',
        error: error.message,
      };
    }
  }
}
