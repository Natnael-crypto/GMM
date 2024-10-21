import { transports, format } from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export const LoggerFactory = (appName: string) => {
  let consoleFormat;

  consoleFormat = format.combine(
    format.timestamp(),
    format.ms(),
    nestWinstonModuleUtilities.format.nestLike(appName, {
      colors: true,
      prettyPrint: true,
    }),
  );

  return WinstonModule.createLogger({
    level: 'debug',
    transports: [new transports.Console({ format: consoleFormat })],
  });
};

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    this.logger.log(`Incoming Request: ${method} ${originalUrl}`);

    res.on('finish', () => {
      const { statusCode } = res;
      const executionTime = Date.now() - startTime;

      this.logger.log(
        `Request Completed: ${method} ${originalUrl} ${statusCode} - ${executionTime}ms`,
      );
    });

    next();
  }
}
