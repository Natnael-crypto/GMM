import { ApiProperty } from "@nestjs/swagger";

export class DownloadFileQueryDto {
    @ApiProperty({
    example: 'my-bucket',
    })
    bucketName: string;
  
    @ApiProperty({
    example: 'folder/my-image.png',
    })
    filename: string;
  
    @ApiProperty({
    example: 'my-image.png',
    })
    originalname: string;
  
    @ApiProperty({
    example: 'image/png',
    })
    contentType: string;
  }