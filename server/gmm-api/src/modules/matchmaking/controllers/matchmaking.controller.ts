import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MatchMakingService } from '../services/matchmaking.service';
import { UpdatePreferenceDto } from '../dtos/preference.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Request, Response } from 'express';
import { User } from '@modules/user/entities/user.entity';
import { PermissionGuard } from '@modules/auth/guards/permission.guard';
import { AcceptOrRejectInvitationDto } from '../dtos/invitation.dto';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UserSpecificCacheInterceptor } from '@shared/interceptors/cache.interceptor';
import { ApiKeyAuthGuard } from '@modules/auth/guards/apikey-auth.guard';
import { Match } from '../entities/match.entity';
import { ImageAccessRequestService } from '../services/image-request.service';
import { ImageAccessRequestDto } from '../dtos/image-access-request.dto';
import {
  AllowMatchUserProfileDto,
  AllowMatchChatDto,
} from '../dtos/allow-match-data.dto';

@ApiTags('matchmaking')
@ApiBearerAuth()
@Controller('matchmaking')
export class MatchMakingController {
  constructor(
    private readonly matchmakingService: MatchMakingService,
    private readonly imageAccessRequestService: ImageAccessRequestService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @ApiBody({
    type: UpdatePreferenceDto,
    required: true,
  })
  @UseGuards(JwtAuthGuard)
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

      const userId = (req.user as User).id;
      const keys = [
        `/users/me/${userId}`,
        `/users/${userId}`,
        `/matchmaking/potential-matches/${userId}`,
      ];

      await Promise.all(keys.map((key) => this.cacheManager.del(key)));

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

  @UseGuards(JwtAuthGuard)
  @Post('matches/image-requests')
  async createImageAccessRequest(@Req() req: Request) {
    const imageAccess =
      await this.imageAccessRequestService.createImageAccessRequest(
        (req.user as User).id,
      );

    const existingMatch = await this.matchmakingService.getMatch(
      imageAccess.matchId,
    );
    const maleUserId = existingMatch.maleUser.id;
    const femaleUserId = existingMatch.femaleUser.id;

    const keys = [
      `/matchmaking/current-match/${maleUserId}`,
      `/matchmaking/current-match/${femaleUserId}`,
      `/matchmaking/${maleUserId}`,
      `/matchmaking/${femaleUserId}`,
      `/matchmaking/matches/${imageAccess.matchId}`,
      `/matchmaking/matches/`,
      `/users/${maleUserId}`,
      `/users/${femaleUserId}`,
      `/users/me/${maleUserId}`,
      `/users/me/${femaleUserId}`,
    ];

    await Promise.all(keys.map((key) => this.cacheManager.del(key)));

    return {
      message: 'Image access request created successfully',
      data: imageAccess,
    };
  }

  // @Put('matches/image-requests/:id') -> imageRequestAccessId
  @UseGuards(JwtAuthGuard)
  @Put('matches/image-requests/:id')
  async updateImageAccessRequest(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: ImageAccessRequestDto,
    @Req() req: Request,
  ) {
    const imageAccess =
      await this.imageAccessRequestService.updateImageAccessRequest(
        id,
        (req.user as User).id,
        dto,
      );

    const existingMatch = await this.matchmakingService.getMatch(
      imageAccess.matchId,
    );
    const maleUserId = existingMatch.maleUser.id;
    const femaleUserId = existingMatch.femaleUser.id;

    const keys = [
      `/matchmaking/current-match/${maleUserId}`,
      `/matchmaking/current-match/${femaleUserId}`,
      `/matchmaking/${maleUserId}`,
      `/matchmaking/${femaleUserId}`,
      `/matchmaking/matches/${imageAccess.matchId}`,
      `/matchmaking/matches/`,
      `/users/${maleUserId}`,
      `/users/${femaleUserId}`,
      `/users/me/${maleUserId}`,
      `/users/me/${femaleUserId}`,
    ];

    await Promise.all(keys.map((key) => this.cacheManager.del(key)));

    return {
      message: 'Image access updated successfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('matches/image-requests')
  async getImageAccessRequests(@Req() req: Request) {
    const imageAccess =
      await this.imageAccessRequestService.getImageAccessRequests(
        (req.user as User).id,
      );

    return {
      message: 'Image access fetched successfully',
      data: imageAccess,
    };
  }

  @UseInterceptors(UserSpecificCacheInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('potential-matches')
  async getPotentialMatchesCount(@Req() req: Request) {
    try {
      const count = await this.matchmakingService.countPotentialMatches(
        (req.user as User).id,
      );
      return {
        message: 'Potential matches count fetched successfully',
        data: count,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch potential matches count',
        error: error.message,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async match(@Req() req: Request & { user: User }) {
    try {
      const userId = req.user.id;
      const { match, newlyAddedToPool } =
        await this.matchmakingService.match(userId);

      if (!match) {
        const key = `/matchmaking/pool`;
        await this.cacheManager.del(key);

        if (newlyAddedToPool) {
          return {
            message: 'Finding you a match. You will be notified when matched.',
          };
        } else {
          return {
            message: 'No match found. You will be notified when matched.',
          };
        }
      }

      const maleUserId = match.maleUserId;
      const femaleUserId = match.femaleUserId;

      const keys = [
        `/matchmaking/${maleUserId}`,
        `/matchmaking/${femaleUserId}`,
        `/matchmaking/matches`,
        `/users/${maleUserId}`,
        `/users/${femaleUserId}`,
        `/users/me/${maleUserId}`,
        `/users/me/${femaleUserId}`,
        `/payments/remaining-matches/${maleUserId}`,
        `/payments/remaining-matches/${femaleUserId}`,
      ];

      await Promise.all(keys.map((key) => this.cacheManager.del(key)));

      return {
        message: 'Matched successfully',
        data: match,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('matches/:id/invitations')
  async inviteToNextStage(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() request: Request & { user: User },
  ) {
    try {
      const match = await this.matchmakingService.inviteToNextStage(
        id,
        request.user,
      );

      const existingMatch = await this.matchmakingService.getMatch(id);
      const maleUserId = existingMatch.maleUser.id;
      const femaleUserId = existingMatch.femaleUser.id;

      const keys = [
        `/matchmaking/current-match/${maleUserId}`,
        `/matchmaking/current-match/${femaleUserId}`,
        `/matchmaking/${maleUserId}`,
        `/matchmaking/${femaleUserId}`,
        `/matchmaking/matches/${id}`,
        `/matchmaking/matches/`,
        `/users/${maleUserId}`,
        `/users/${femaleUserId}`,
        `/users/me/${maleUserId}`,
        `/users/me/${femaleUserId}`,
      ];

      await Promise.all(keys.map((key) => this.cacheManager.del(key)));

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

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UserSpecificCacheInterceptor)
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

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UserSpecificCacheInterceptor)
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

  @UseGuards(JwtAuthGuard)
  @Delete('current-match')
  async unmatch(@Req() req: Request) {
    try {
      const match = await this.matchmakingService.unmatchByUserId(
        (req.user as User).id,
      );

      const maleUserId = match.maleUserId;
      const femaleUserId = match.femaleUserId;

      const keys = [
        `/matchmaking/current-match/${maleUserId}`,
        `/matchmaking/current-match/${femaleUserId}`,
        `/matchmaking/${maleUserId}`,
        `/matchmaking/${femaleUserId}`,
        `/matchmaking/matches/${match.id}`,
        `/matchmaking/matches/`,
        `/users/${maleUserId}`,
        `/users/${femaleUserId}`,
        `/users/me/${maleUserId}`,
        `/users/me/${femaleUserId}`,
      ];

      await Promise.all(keys.map((key) => this.cacheManager.del(key)));

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

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CacheInterceptor)
  @Get('matches/:id')
  async getMatch(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() request: Request & { user: User },
  ) {
    try {
      const match = await this.matchmakingService.getMatch(id);

      if (
        match.allowMatchedUserView ||
        match.maleUserId === request.user.id ||
        match.femaleUserId === request.user.id
      ) {
        return {
          message: 'Match fetched successfully',
          data: match,
        };
      } else {
        throw new UnauthorizedException(
          'You are not authorized to view this match.',
        );
      }
    } catch (error) {
      return {
        message: 'Failed to fetch match',
        error: error.message,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CacheInterceptor)
  @Get('matches/user/:id')
  async getUserMatch(
    @Param('id', new ParseUUIDPipe({ version: '4' })) userId: string,
  ) {
    try {
      const match = await this.matchmakingService.getActiveMatch(userId);
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
  @UseGuards(JwtAuthGuard)
  @Put('matches/invitations/:id')
  async acceptOrRejectInvitation(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
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

      const invitation = await this.matchmakingService.getInvitationById(id);
      const existingMatch = invitation.match;

      if (existingMatch) {
        const maleUserId = existingMatch.maleUserId;
        const femaleUserId = existingMatch.femaleUserId;

        const keys = [
          `/matchmaking/current-match/${maleUserId}`,
          `/matchmaking/current-match/${femaleUserId}`,
          `/matchmaking/${maleUserId}`,
          `/matchmaking/${femaleUserId}`,
          `/matchmaking/matches/${existingMatch.id}`,
          `/matchmaking/matches/`,
          `/users/${maleUserId}`,
          `/users/${femaleUserId}`,
          `/users/me/${maleUserId}`,
          `/users/me/${femaleUserId}`,
        ];

        await Promise.all(keys.map((key) => this.cacheManager.del(key)));
      }

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

  @UseGuards(JwtAuthGuard)
  @Put('matches/matched-user-profile/:matchId')
  async accessMatchedUserProfile(
    @Param('matchId', new ParseUUIDPipe({ version: '4' })) matchId: string,
    @Req() req: Request,
    @Body() dto: AllowMatchUserProfileDto,
  ) {
    try {
      await this.matchmakingService.toggleMatchUserProfile(
        (req.user as User).id,
        matchId,
        dto,
      );

      const match = await this.matchmakingService.getMatch(matchId);
      const maleUserId = match.maleUserId;
      const femaleUserId = match.femaleUserId;

      const keys = [
        `/matchmaking/current-match/${maleUserId}`,
        `/matchmaking/current-match/${femaleUserId}`,
        `/matchmaking/${maleUserId}`,
        `/matchmaking/${femaleUserId}`,
        `/matchmaking/matches/${matchId}`,
      ];

      await Promise.all(keys.map((key) => this.cacheManager.del(key)));

      return {
        message: 'Access to matched user profiles updated',
        success: true,
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('matches/matched-chat/:matchId')
  async accessMatchedChat(
    @Param('matchId', new ParseUUIDPipe({ version: '4' })) matchId: string,
    @Req() req: Request,
    @Body() dto: AllowMatchChatDto,
  ) {
    try {
      await this.matchmakingService.toggleMatchChat(
        (req.user as User).id,
        matchId,
        dto,
      );

      const match = await this.matchmakingService.getMatch(matchId);
      const maleUserId = match.maleUserId;
      const femaleUserId = match.femaleUserId;

      const keys = [
        `/matchmaking/current-match/${maleUserId}`,
        `/matchmaking/current-match/${femaleUserId}`,
        `/matchmaking/${maleUserId}`,
        `/matchmaking/${femaleUserId}`,
        `/matchmaking/matches/${matchId}`,
      ];

      await Promise.all(keys.map((key) => this.cacheManager.del(key)));
      return {
        message: 'Access to matched chat updated',
        success: true,
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  @Post('share-family-information')
  async shareFamilyInfo(@Req() request: Request & { user: User }) {
    const { maleUserId, femaleUserId, matchId } =
      await this.matchmakingService.shareFamilyInfo(request.user);

    const keys = [
      `/matchmaking/matches/${matchId}`,
      `/matchmaking/current-match/${maleUserId}`,
      `/matchmaking/current-match/${femaleUserId}`,
      `/matchmaking/${maleUserId}`,
      `/matchmaking/${femaleUserId}`,
      `/matchmaking/matches/`,
      `/users/${maleUserId}`,
      `/users/${femaleUserId}`,
      `/users/me/${maleUserId}`,
      `/users/me/${femaleUserId}`,
    ];

    await Promise.all(keys.map((key) => this.cacheManager.del(key)));
  }

  /** ADMIN ROUTES */
  @UseGuards(JwtAuthGuard, new PermissionGuard(['match:read']))
  @UseInterceptors(CacheInterceptor)
  @Get('matches')
  async getAllMatches() {
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

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CacheInterceptor)
  @Get()
  async getActiveMatches() {
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

  @UseGuards(JwtAuthGuard, new PermissionGuard(['match:read']))
  @UseInterceptors(CacheInterceptor)
  @Get('pool')
  async getUsersInMatchPool() {
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

  // invalidate users matchmaking cache by userId
  @UseGuards(ApiKeyAuthGuard)
  @Delete('cache')
  async invalidateCache(
    @Query('maleUserId')
    maleUserIdParam: string,
    @Query('femaleUserId')
    femaleUserIdParam: string,
    @Query('matchId') matchId: string,
  ) {
    try {
      let match: Match | undefined;

      try {
        if (matchId) {
          match = await this.matchmakingService.getMatch(matchId);
        }
      } catch (error) {}

      const maleUserId = maleUserIdParam ?? match?.maleUser?.id;
      const femaleUserId = femaleUserIdParam ?? match?.femaleUser?.id;

      const keys = [
        `/matchmaking/matches/${matchId}`,
        `/matchmaking/current-match/${maleUserId}`,
        `/matchmaking/current-match/${femaleUserId}`,
        `/matchmaking/${maleUserId}`,
        `/matchmaking/${femaleUserId}`,
        `/matchmaking/matches/`,
        `/users/${maleUserId}`,
        `/users/${femaleUserId}`,
        `/users/me/${maleUserId}`,
        `/users/me/${femaleUserId}`,
        `/payments/remaining-matches/${maleUserId}`,
        `/payments/remaining-matches/${femaleUserId}`,
      ];
      await Promise.all(keys.map((key) => this.cacheManager.del(key)));
      return {
        message: 'Cache invalidated successfully',
      };
    } catch (error) {
      return {
        message: 'Failed to invalidate cache',
        error: error.message,
      };
    }
  }
}
