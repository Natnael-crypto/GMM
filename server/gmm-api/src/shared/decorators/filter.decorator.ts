import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

export interface Filtering {
  property: string;
  rule: string;
  value: string | null;
}

export enum FilterRule {
  EQUALS = 'eq',
  NOT_EQUALS = 'neq',
  GREATER_THAN = 'gt',
  GREATER_THAN_OR_EQUALS = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_OR_EQUALS = 'lte',
  LIKE = 'like',
  NOT_LIKE = 'nlike',
  IN = 'in',
  NOT_IN = 'nin',
  IS_NULL = 'isnull',
  IS_NOT_NULL = 'isnotnull',
}

export const FilteringParams = createParamDecorator(
  (data, ctx: ExecutionContext): Filtering[] => {
    const req: Request = ctx.switchToHttp().getRequest();
    const filter = req.query.filter as string;

    if (!filter) return [];

    if (!Array.isArray(data)) {
      throw new BadRequestException(
        `Expected 'data' to be an array of allowed filter properties, but got ${typeof data}`,
      );
    }

    const filterExpressions = filter.split(',');

    return filterExpressions.map((expression, index) => {
      const validFilterRegex =
        /^[a-zA-Z0-9_]+:(eq|neq|gt|gte|lt|lte|like|nlike|in|nin):[a-zA-Z0-9_,]+$/;
      const validNullFilterRegex = /^[a-zA-Z0-9_]+:(isnull|isnotnull)$/;

      if (
        !validFilterRegex.test(expression) &&
        !validNullFilterRegex.test(expression)
      ) {
        throw new BadRequestException(
          'Invalid filter format. Expected format: property:rule:value or property:rule. Allowed rules: eq, neq, gt, gte, lt, lte, like, nlike, in, nin, isnull, isnotnull.',
        );
      }

      const [property, rule, value] = expression.split(':');

      if (!data.includes(property)) {
        throw new BadRequestException(
          `Invalid filter property "${property}" at position ${index + 1}. Allowed properties: ${data.join(', ')}.`,
        );
      }

      if (!Object.values(FilterRule).includes(rule as FilterRule)) {
        throw new BadRequestException(
          `Invalid filter rule "${rule}" at position ${index + 1}. Allowed rules: ${Object.values(FilterRule).join(', ')}.`,
        );
      }

      if (
        (rule === FilterRule.IS_NULL || rule === FilterRule.IS_NOT_NULL) &&
        value
      ) {
        throw new BadRequestException(
          `The rule '${rule}' does not require a value.`,
        );
      }

      if (
        rule !== FilterRule.IS_NULL &&
        rule !== FilterRule.IS_NOT_NULL &&
        !value
      ) {
        throw new BadRequestException(`The rule '${rule}' requires a value.`);
      }

      return { property, rule, value: value || null };
    });
  },
);
