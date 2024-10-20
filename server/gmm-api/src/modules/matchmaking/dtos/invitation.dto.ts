import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { InvitationToMatchStageStatus } from '../enums/matchmaking.enum';

export class AcceptOrRejectInvitationDto {
  @ApiProperty({ example: 'ACCEPT' })
  @IsEnum(InvitationToMatchStageStatus)
  action: InvitationToMatchStageStatus;
}
