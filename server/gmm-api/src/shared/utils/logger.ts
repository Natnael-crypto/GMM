import { transports, format } from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from '@modules/user/entities/user.entity';

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

    res.on('finish', () => {
      const { statusCode } = res;
      const executionTime = Date.now() - startTime;
      const ip = req.ip;
      const userId = (req?.user as User)?.id || 'anonymous';

      const log = `[IP: ${ip}] [user: ${userId}] ${method} ${originalUrl} | ${statusCode} | ${executionTime}ms`;

      if (res.statusCode >= 500) {
        this.logger.error(log);
      } else if (res.statusCode >= 400) {
        this.logger.warn(log);
      } else {
        this.logger.log(log);
      }
    });

    next();
  }
}
