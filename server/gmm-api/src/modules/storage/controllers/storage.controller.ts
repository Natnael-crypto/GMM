import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StorageService } from '../services/storage.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiVersion } from '@shared/types/version';
import { PresignedUploadUrlDto } from '../dtos/presigned-upload-url.dto';

@ApiTags('storage')
@Controller({ version: ApiVersion.V1, path: 'storage' })
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('presigned-url')
  async presignedUpload(@Body() presignedUploadUrlDto: PresignedUploadUrlDto) {
    return await this.storageService.generatePresignedUploadUrl(
      presignedUploadUrlDto,
    );
  }

  @Get('presigned-url/:id')
  async getPresignedDownloadUrl(@Param('id') id: string) {
    return await this.storageService.generatePresignedDownloadUrl(id);
  }
}
