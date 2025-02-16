import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StorageService } from '../services/storage.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiVersion } from '@shared/types/version';
import { PresignedUploadUrlDto } from '../dtos/presigned-upload-url.dto';
import { JwtOrInviteAuthGuard } from '@modules/auth/guards/jwt-or-invite.guard';

@ApiTags('storage')
@ApiBearerAuth()
// @UseGuards(JwtOrInviteAuthGuard)
@Controller({ version: ApiVersion.V1, path: 'storage' })
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('presigned-url')
  async presignedUpload(@Body() presignedUploadUrlDto: PresignedUploadUrlDto) {
    try {
      const fileInfo = await this.storageService.generatePresignedUploadUrl(
        presignedUploadUrlDto,
      );
      return {
        message: 'Presigned upload URL generated successfully',
        data: fileInfo,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  @Get('presigned-url/:id')
  async getPresignedDownloadUrl(@Param('id') id: string) {
    try {
      const url = await this.storageService.generatePresignedDownloadUrl(id);
      const cleanUrl = { url: url };

      return {
        message: 'Presigned download URL generated successfully',
        data: cleanUrl,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
