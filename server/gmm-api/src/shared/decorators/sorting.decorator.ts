import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

export interface Sorting {
  property: string;
  direction: 'asc' | 'desc';
}

export const SortingParams = createParamDecorator(
  (validParams: string[], ctx: ExecutionContext): Sorting | null => {
    const req: Request = ctx.switchToHttp().getRequest();
    const sort = req.query.sort as string;

    if (!sort) return null;

    if (!Array.isArray(validParams)) {
      throw new BadRequestException(
        `Expected 'validParams' to be an array, but received ${typeof validParams}.`,
      );
    }

    const sortPattern = /^([a-zA-Z0-9_]+):(asc|desc)$/;
    if (!sort.match(sortPattern)) {
      throw new BadRequestException(
        `Invalid sort format. Expected format: 'property:direction' where direction is 'asc' or 'desc'. Got '${sort}'.`,
      );
    }

    const [property, direction] = sort.split(':');
    
    if (!validParams.includes(property)) {
      throw new BadRequestException(
        `Invalid sort property: '${property}'. Allowed properties: ${validParams.join(', ')}.`,
      );
    }
    
    return { property, direction } as Sorting;
  },
);
