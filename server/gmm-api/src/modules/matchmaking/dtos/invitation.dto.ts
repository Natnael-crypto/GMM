import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { StageInvitationStatus } from '../entities/match-invitation.entity';

export class AcceptOrRejectInvitationDto {
  @ApiProperty({ example: 'ACCEPT' })
  @IsEnum(StageInvitationStatus)
  action: StageInvitationStatus;
}
