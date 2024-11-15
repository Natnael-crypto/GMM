import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class SubmissionDto {
  @ApiProperty({
    example: '285a4ceb-9523-4498-a233-8e2c6ac8db0c',
    description: 'UUID of field',
  })
  @IsUUID()
  fieldId: string;

  @ApiProperty({ description: 'Value' })
  @IsNotEmpty()
  value: any;
}
