import {
    DeleteObjectCommand,
    GetObjectCommand,
    NoSuchKey,
    PutObjectCommand,
    S3Client,
  } from '@aws-sdk/client-s3';
  import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
  import { Injectable } from '@nestjs/common';
  import { FileNotFoundException } from './exceptions';
import { S3 } from '../types';
  
  @Injectable()
  export class AwsS3 extends S3 {
    constructor(private readonly s3: S3Client) {
      super();
    }
  
    async presignedPutObject(
      bucketName: string,
      objectName: string,
      contentType: string,
      duration: number,
    ): Promise<string> {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: objectName,
        ContentType: contentType,
      });
  
      return await getSignedUrl(this.s3, command, {
        expiresIn: duration,
        signingDate: new Date(),
      });
    }
  
    async presignedGetObject(
      bucketName: string,
      objectName: string,
      contentType: string,
      duration: number,
    ): Promise<string> {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectName,
      });
    
      try {
        const signedUrl = await getSignedUrl(this.s3, command, { expiresIn: duration });
        return signedUrl;
      } catch (e) {
        if (e instanceof NoSuchKey) {
          throw new FileNotFoundException(objectName);
        }
        throw e;
      }
    }
  
    async deleteObject(bucketName: string, objectName: string): Promise<void> {
      const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: objectName,
      });
  
      await this.s3.send(command);
    }
  
    async getObject(bucketName: string, objectName: string): Promise<any> {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectName,
      });
  
      try {
        const response = await this.s3.send(command);
        if (response.Body) {
          return Buffer.from(await response.Body.transformToByteArray());
        } else {
          throw new Error("Response body is undefined");
        }
      } catch (e) {
        if (e instanceof NoSuchKey) {
          throw new FileNotFoundException(objectName);
        }
      }
    }
  
    async putObject(
      bucketName: string,
      objectName: string,
      data: Buffer,
    ): Promise<void> {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: objectName,
        Body: data,
      });
  
      await this.s3.send(command);
    }
  }