import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestGuardianDto } from '../dtos/guardian.dto';
import { GuardianService } from '../services/guardian.service';

@ApiTags('Guardian')
@ApiBearerAuth()
@Controller('guardian')
export class GuardianController {
  constructor(private readonly guardianService: GuardianService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async requestGuardian(
    @Body() guardianDto: RequestGuardianDto,
    @Req() req: Request & { user: any },
  ) {
    const user = req.user;
    const request = await this.guardianService.requestGuardian(
      user.id,
      guardianDto.guardianId,
    );

    return {
      message: 'Guardian request sent to user successfully',
      data: request,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('accept/:requestId')
  async acceptGuardianRequest(
    @Param('requestId') requestId: string,
    @Req() req: Request & { user: any },
  ) {
    const user = req.user;
    const updatedUser = await this.guardianService.acceptGuardianRequest(
      requestId,
      user.id,
    );

    return {
      message: 'Guardian request accepted successfully',
      data: updatedUser,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  async removeGuardian(
    @Param('userId') id: string,
    @Req() req: Request & { user: any },
  ) {
    const updatedUser = await this.guardianService.removeGuardian(
      id,
      req.user.id,
    );
    return {
      message: 'Guardian removed successfully',
      data: updatedUser,
    };
  }
}
