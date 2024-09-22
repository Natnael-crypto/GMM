import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { StorageService } from '../services/storage.service';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiVersion } from '@shared/types/version';
import { PresignedUploadUrlDto } from '../dtos/presigned-upload-url.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@ApiTags('storage')
@ApiBearerAuth()
@Controller({ version: ApiVersion.V1, path: 'storage' })
@UseGuards(JwtAuthGuard)
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('presigned-url')
  async presignedUpload(
    @Body() presignedUploadUrlDto: PresignedUploadUrlDto,
    @Res() response: Response,
  ) {
    try {
      const fileInfo = await this.storageService.generatePresignedUploadUrl(
        presignedUploadUrlDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Presigned upload URL generated successfully',
        data: fileInfo,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to generate presigned upload URL',
        error: error.message,
      });
    }
  }

  @Get('presigned-url/:id')
  async getPresignedDownloadUrl(
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    try {
      const url = await this.storageService.generatePresignedDownloadUrl(id);
      return response.status(HttpStatus.OK).json({
        message: 'Presigned download URL generated successfully',
        data: { url },
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to generate presigned download URL',
        error: error.message,
      });
    }
  }
}
