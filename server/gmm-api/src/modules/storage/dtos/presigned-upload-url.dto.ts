import { ApiProperty } from '@nestjs/swagger';

export class PresignedUploadUrlDto {
  @ApiProperty({
    description: 'The name of the file to upload',
    example: 'my-image.png',
  })
  filename: string;

  @ApiProperty({
    description: 'The MIME type of the file',
    example: 'image/png',
  })
  contentType: string;
}
