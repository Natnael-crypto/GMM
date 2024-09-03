import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PresignedUploadUrlDto {
  @ApiProperty({
    description: 'Size of the file in bytes',
    example: 10,
  })
  @IsNumber()
  size: number;

  @ApiProperty({
    description: 'The MIME type of the file',
    example: 'image/png',
  })
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'SHA256 checksum of the file',
    example: 'd41d8cd98f00b204e9800998ecf8427e',
  })
  @IsNotEmpty()
  checksum: string;
}
