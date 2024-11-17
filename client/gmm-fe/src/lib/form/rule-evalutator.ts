type ComparisonOperator =
  | '=='
  | '!='
  | '>'
  | '>='
  | '<'
  | '<='
  | 'in'
  | 'contains';

interface Condition {
  field: string;
  operator: ComparisonOperator;
  value: any;
}

type LogicalOperator = { and: Rule[] } | { or: Rule[] } | { not: Rule };

type Rule = LogicalOperator | Condition;

type Data = Record<string, any>;

export const evaluateRuleTree = (rule: Rule, data: Data): boolean => {
  if (!rule) return true;

  if ('and' in rule) {
    return rule.and.every((subRule) => evaluateRuleTree(subRule, data));
  }

  if ('or' in rule) {
    return rule.or.some((subRule) => evaluateRuleTree(subRule, data));
  }

  if ('not' in rule) {
    return !evaluateRuleTree(rule.not, data);
  }

  const { field, operator, value } = rule;

  // if (!data.hasOwnProperty(field)) {
  //   console.error(`Field "${field}" is missing in the form data`);
  //   return true;
  // }

  const fieldValue = data[field];

  switch (operator) {
    case '==':
      return fieldValue === value;
    case '!=':
      return fieldValue !== value;
    case '>':
      return fieldValue > value;
    case '>=':
      return fieldValue >= value;
    case '<':
      return fieldValue < value;
    case '<=':
      return fieldValue <= value;
    case 'in':
      return Array.isArray(value) && value.includes(fieldValue);
    case 'contains':
      return (
        (typeof fieldValue === 'string' || Array.isArray(fieldValue)) &&
        fieldValue.includes(value)
      );
    default:
      console.error(`Unsupported operator "${operator}"`);
      return true;
  }
};
