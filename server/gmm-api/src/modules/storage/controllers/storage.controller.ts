import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    Res,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { StorageService } from '../services/storage.service';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { Response as ExpressResponse } from 'express';
  import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
  import { ApiVersion } from '@shared/types/version';
import { PresignedUploadUrlDto } from '../dtos/presigned-upload-url.dto';
import { PresignedDownloadUrlDto } from '../dtos/presigned-download-url.dto';
import { DownloadFileQueryDto } from '../dtos/download-file-query.dto';
import { UploadFileDto } from '../dtos/upload-file.dto';
  
  
  
  @ApiTags('storage')
  @Controller({ version: ApiVersion.V1, path: 'storage' })
  export class StorageController {
    constructor(private readonly storageService: StorageService) {}
  
    @Post('upload-url')
    async presignedUpload(
      @Body() presignedUploadUrlDto: PresignedUploadUrlDto,
    ) {
      return await this.storageService.generatePresignedUploadUrl({
        bucketName: process.env.AWS_BUCKET_NAME || '',
        originalname: presignedUploadUrlDto.filename,
        contentType: presignedUploadUrlDto.contentType,
      });
    }
  
    @Post('download-url')
    async getPresignedDownloadUrl(
      @Body() presignedDownloadUrlDto: PresignedDownloadUrlDto,
    ) {
      return await this.storageService.generatePresignedDownloadUrl({
        bucketName: process.env.AWS_BUCKET_NAME || '',
        filepath: presignedDownloadUrlDto.filename,
        originalname: presignedDownloadUrlDto.filename,
        contentType: presignedDownloadUrlDto.contentType,
      });
    }
  
    @Get('download')
    async downloadFile(
      @Query() query: DownloadFileQueryDto,
      @Res() response: ExpressResponse,
    ) {
      const result = await this.storageService.download(
        {
          bucketName: query.bucketName,
          filepath: query.filename,
          contentType: query.contentType,
          originalname: query.originalname,
        },
        response,
      );
  
      return response.send(result);
    }
  
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({ description: 'File to upload', type: UploadFileDto })
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
      return await this.storageService.upload(
        file,
        process.env.AWS_BUCKET_NAME || '',
      );
    }
  }
  