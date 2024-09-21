import { FamilyIntroduction } from '../schemas/family-introduction';
import {
  ExpectedIslamicLifestyle,
  IslamicLifestyle,
} from '../schemas/islamic-lifestyle';
import { MarriageDiscussion } from '../schemas/marriage-discussion';
import { User } from '../schemas/user';
import {
  ExpectedWorldlyLifestyle,
  WorldlyLifestyle,
} from '../schemas/worldly-lifestyle';

export type FilterRule =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'like'
  | 'nlike'
  | 'in'
  | 'nin'
  | 'isnull'
  | 'isnotnull';

export type UserField =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phoneNumber'
  | 'age'
  | 'gender'
  | 'height'
  | 'weight'
  | 'country'
  | 'city'
  | 'skinColor'
  | 'languages'
  | 'nationality'
  | 'numberOfChildren'
  | 'ageOfOldestChild'
  | 'ageOfYoungestChild'
  | 'sunniMadhaib'
  | 'religiousPractice'
  | 'bornMuslim'
  | 'drinks'
  | 'smokes'
  | 'drugs'
  | 'tattoos'
  | 'maritalStatus';

export type UserFilterParams = {
  [key in UserField]?: { [key in FilterRule]?: { value?: string | null } };
};

export class UserQueryParams {
  filters: UserFilterParams;
  public page?: number;
  public limit?: number;
  public sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };

  public filterableFields: UserField[];

  constructor({
    filters,
    page,
    limit,
    sort,
  }: {
    filters: UserFilterParams;
    page?: number;
    limit?: number;
    sort?: {
      field: string;
      direction: 'asc' | 'desc';
    };
  }) {
    this.filters = filters;
    this.filterableFields = [
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'age',
      'gender',
      'height',
      'weight',
      'country',
      'city',
      'skinColor',
      'languages',
      'nationality',
      'numberOfChildren',
      'ageOfOldestChild',
      'ageOfYoungestChild',
      'sunniMadhaib',
      'religiousPractice',
      'bornMuslim',
      'drinks',
      'smokes',
      'drugs',
      'tattoos',
      'maritalStatus',
    ];
  }

  public toQueryString(): string {
    let queries = [];
    let filterString = '';

    filterString = this.filterableFields
      .filter((field) => this.filters[field])
      .flatMap((field) => {
        const filter = this.filters[field]!;

        return Object.keys(filter)
          .filter((rule) => filter[rule as FilterRule] !== undefined)
          .map((rule) => {
            if (filter[rule as FilterRule]!.value === null) {
              return `${field}:${rule}`;
            } else {
              return `${field}:${rule}:${filter[rule as FilterRule]!.value}`;
            }
          });
      })
      .join(',');
    queries.push(`filter=${filterString}`);

    if (this.page) {
      queries.push(`page=${this.page}`);
    }

    if (this.limit) {
      queries.push(`limit=${this.limit}`);
    }

    if (this.sort) {
      queries.push(`sort=${this.sort.field}:${this.sort.direction}`);
    }

    return queries.join('&');
  }

  public static fromQueryString(queryString: string): UserQueryParams {
    const queryParams = new UserQueryParams({
      filters: {},
    });

    const params = new URLSearchParams(queryString);

    if (params.has('filter')) {
      const filters = params.get('filter')?.split(',');
      filters?.forEach((filter) => {
        const [field, rule, value] = filter.split(':');
        const prevFilters = queryParams.filters[field as UserField] ?? {};

        queryParams.filters[field as UserField] = {
          ...prevFilters,
          [rule as FilterRule]: { value: value === undefined ? null : value },
        };
      });
    }

    if (params.has('page')) {
      queryParams.page = Number(params.get('page'));
    }

    if (params.has('limit')) {
      queryParams.limit = Number(params.get('limit'));
    }

    if (params.has('sort')) {
      const [field, direction] = params.get('sort')!.split(':');
      queryParams.sort = { field, direction: direction as 'asc' | 'desc' };
    }

    return queryParams;
  }
}

export interface UpdateUser {
  user: User;
  self: boolean;
}

export interface UpdateWorldlyLifestyle {
  userId: string;
  worldlyLifestyle: WorldlyLifestyle;
  self: boolean;
}

export interface UpdateExpectedWorldlyLifestyle {
  userId: string;
  expectedWorldlyLifestyle: ExpectedWorldlyLifestyle;
  self: boolean;
}

export interface UpdateIslamicLifestyle {
  userId: string;
  islamicLifestyle: IslamicLifestyle;
  self: boolean;
}

export interface UpdateExpectedIslamicLifestyle {
  userId: string;
  expectedIslamicLifestyle: ExpectedIslamicLifestyle;
  self: boolean;
}

export interface UpdateMarriageDiscussion {
  userId: string;
  marriageDiscussion: MarriageDiscussion;
  self: boolean;
}

export interface UpdateFamilyIntroduction {
  userId: string;
  familyIntroduction: FamilyIntroduction;
  self: boolean;
}

export interface UploadFileInfo {
  type: string;
  size: number;
  checksum: string;
}

export interface UploadFile {
  url: string;
  file: File;
}

export interface UrlResponse {
  url: string;
  fileKey: string;
}
