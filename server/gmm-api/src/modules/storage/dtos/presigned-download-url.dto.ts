import { ApiProperty } from "@nestjs/swagger";

export class PresignedDownloadUrlDto {
    @ApiProperty({
      example: 'my-image.png',
    })
    filename: string;
  
    @ApiProperty({
      example: 'image/png',
    })
    contentType: string;
  }