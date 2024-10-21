import { Injectable } from '@nestjs/common';
import {
  GetObjectCommand,
  NoSuchKey,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import {
  FileNotFoundException,
  UnsupportedFileTypeException,
} from './exceptions';
import { PresignedUploadUrlDto } from '../dtos/presigned-upload-url.dto';
import { AwsConfig } from '@shared/config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  private awsConfig: AwsConfig;

  constructor(
    private readonly s3: S3Client,
    configService: ConfigService,
  ) {
    this.awsConfig = configService.get<AwsConfig>('aws')!;
  }

  async generatePresignedDownloadUrl(fileId: string) {
    const command = new GetObjectCommand({
      Bucket: this.awsConfig.s3.bucketName,
      Key: fileId,
    });

    try {
      const signedUrl = await getSignedUrl(this.s3, command, {
        expiresIn: this.awsConfig.s3.presignedUrlTTL,
      });
      return signedUrl;
    } catch (e) {
      if (e instanceof NoSuchKey) {
        throw new FileNotFoundException(fileId);
      }
      throw e;
    }
  }

  async generatePresignedUploadUrl(file: PresignedUploadUrlDto) {
    const ext = this.inferExtensionFromContentType(file.type);

    const normalizedFileName = `${randomUUID()}${ext}`;

    const command = new PutObjectCommand({
      Bucket: this.awsConfig.s3.bucketName,
      Key: normalizedFileName,
      ContentType: file.type,
      ContentLength: file.size,
    });

    const url = await getSignedUrl(this.s3, command, {
      expiresIn: this.awsConfig.s3.presignedUrlTTL,
      signingDate: new Date(),
    });

    return {
      fileKey: normalizedFileName,
      url,
    };
  }

  private inferExtensionFromContentType(contentType: string) {
    switch (contentType) {
      // Image
      case 'image/jpeg':
        return '.jpg';
      case 'image/png':
        return '.png';
      case 'image/gif':
        return '.gif';
      case 'image/webp':
        return '.webp';
      case 'image/svg+xml':
        return '.svg';
      case 'image/bmp':
        return '.bmp';
      case 'image/tiff':
        return '.tiff';
      case 'image/x-icon':
        return '.ico';
      case 'image/avif':
        return '.avif';

      // Video
      case 'video/mp4':
        return '.mp4';
      case 'video/ogg':
        return '.ogv';
      case 'video/webm':
        return '.webm';
      case 'video/avi':
        return '.avi';
      case 'video/mpeg':
        return '.mpeg';
      case 'video/quicktime':
        return '.mov';
      case 'video/x-ms-wmv':
        return '.wmv';
      default:
        throw new UnsupportedFileTypeException(contentType);
    }
  }
}
