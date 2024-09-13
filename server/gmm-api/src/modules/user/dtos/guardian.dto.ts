import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class RequestGuardianDto {
  @ApiProperty({ example: '28da3e51-ca85-443b-adc6-32b6b111cc3b' })
  @IsString()
  @IsUUID()
  guardianId: string;
}
