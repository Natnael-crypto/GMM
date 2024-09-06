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

@Injectable()
export class StorageService {
  constructor(private readonly s3: S3Client) {}

  async generatePresignedDownloadUrl(fileId: string) {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileId,
    });

    try {
      const signedUrl = await getSignedUrl(this.s3, command, {
        expiresIn: +process.env.PRESIGNED_URL_EXPIRATION!,
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
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: normalizedFileName,
      ContentType: file.type,
      ContentLength: file.size,
    });

    const url = await getSignedUrl(this.s3, command, {
      expiresIn: +process.env.PRESIGNED_URL_EXPIRATION!,
      signingDate: new Date(),
    });

    return {
      fileKey: normalizedFileName,
      url,
    };
  }

  private inferExtensionFromContentType(contentType: string) {
    switch (contentType) {
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
      default:
        throw new UnsupportedFileTypeException(contentType);
    }
  }
}
