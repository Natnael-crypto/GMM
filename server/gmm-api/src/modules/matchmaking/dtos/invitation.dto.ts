import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { InvitationToMatchStageStatus } from '../enums/matchmaking.enum';

export class AcceptOrRejectInvitationDto {
  @ApiProperty({
    enum: InvitationToMatchStageStatus,
  })
  @IsEnum(InvitationToMatchStageStatus)
  action: InvitationToMatchStageStatus;
}
