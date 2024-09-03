import { ApiProperty } from "@nestjs/swagger";

export class UploadFileDto {
    @ApiProperty({
      description: 'The uploaded file',
      type: 'string',
      format: 'binary',
    })
    file: Express.Multer.File;
  }
  