import {
  IsNull,
  Not,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  ILike,
  In,
} from 'typeorm';
import { Filtering, FilterRule } from './filter.decorator';
import { Sorting } from './sorting.decorator';

export const getOrder = (sort?: Sorting) =>
  sort ? { [sort.property]: sort.direction } : {};

export const getWhere = (filters?: Filtering[]) => {
  if (!filters || filters.length === 0) return {};

  const conditions = filters.map((filter) => {
    const { property, rule, value } = filter;

    switch (rule) {
      case FilterRule.IS_NULL:
        return { [property]: IsNull() };

      case FilterRule.IS_NOT_NULL:
        return { [property]: Not(IsNull()) };

      case FilterRule.EQUALS:
        return { [property]: value };

      case FilterRule.NOT_EQUALS:
        return { [property]: Not(value) };

      case FilterRule.GREATER_THAN:
        return { [property]: MoreThan(Number(value)) };

      case FilterRule.GREATER_THAN_OR_EQUALS:
        return { [property]: MoreThanOrEqual(Number(value)) };

      case FilterRule.LESS_THAN:
        return { [property]: LessThan(Number(value)) };

      case FilterRule.LESS_THAN_OR_EQUALS:
        return { [property]: LessThanOrEqual(Number(value)) };

      case FilterRule.LIKE:
        return { [property]: ILike(`%${value}%`) };

      case FilterRule.NOT_LIKE:
        return { [property]: Not(ILike(`%${value}%`)) };

      case FilterRule.IN:
        return { [property]: In(value!.split(',').map((v) => v.trim())) };

      case FilterRule.NOT_IN:
        return { [property]: Not(In(value!.split(',').map((v) => v.trim()))) };

      default:
        return {};
    }
  });

  return Object.assign({}, ...conditions);
};
