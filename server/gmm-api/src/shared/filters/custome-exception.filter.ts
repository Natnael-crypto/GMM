import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

type ResponseError = {
  statusCode: number;
};

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(error: ResponseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (error instanceof HttpException) {
      response.status(error.getStatus()).json({
        statusCode: error.getStatus(),
        message: error.message,
        error: error.name,
      });
    } else {
      const status = error?.statusCode || 500;
      response.status(status).json({
        statusCode: status,
        message: (error as any).message,
        error: 'Internal Server Error',
      });
    }
  }
}
