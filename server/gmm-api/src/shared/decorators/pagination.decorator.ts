import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

export interface Pagination {
  page: number;
  limit: number;
  offset: number;
}

export const PaginationParams = createParamDecorator(
  (data, ctx: ExecutionContext): Pagination => {
    const req: Request = ctx.switchToHttp().getRequest();
    const page = req.query.page ? parseInt(req.query.page as string) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    if (isNaN(page) || page < 0) {
      throw new BadRequestException(
        'Invalid pagination parameter: "page" must be a non-negative integer.',
      );
    }

    if (isNaN(limit) || limit <= 0) {
      throw new BadRequestException(
        'Invalid pagination parameter: "limit" must be a positive integer.',
      );
    }

    if (limit > 100) {
      throw new BadRequestException(
        'Invalid pagination params: Max size is 100',
      );
    }

    const offset = page * limit;
    return { page, limit, offset };
  },
);
