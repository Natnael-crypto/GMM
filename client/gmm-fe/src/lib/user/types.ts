import { FamilyIntroduction } from '../schemas/family-introduction';
import {
  ExpectedIslamicLifestyle,
  FemaleExpectedIslamicLifestyle,
  FemaleIslamicLifestyle,
  IslamicLifestyle,
  MaleExpectedIslamicLifestyle,
  MaleIslamicLifestyle,
} from '../schemas/islamic-lifestyle';
import { MarriageDiscussion } from '../schemas/marriage-discussion';
import { User } from '../schemas/user';
import {
  ExpectedWorldlyLifestyle,
  FemaleExpectedWorldlyLifestyle,
  MaleExpectedWorldlyLifestyle,
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
  | 'currentCountry'
  | 'numberOfChildren'
  | 'ageOfOldestChild'
  | 'ageOfYoungestChild'
  | 'sunniMadhaib'
  | 'religiousPractice'
  | 'bornOrRevertToIslam'
  | 'drinks'
  | 'smokes'
  | 'drugs'
  | 'tattoos'
  | 'maritalStatus';

export type UserFilterParams = {
  [key in UserField]?: { [key in FilterRule]?: { value?: string | null } };
};

export type UserSortParams = {
  field: UserField;
  direction: 'asc' | 'desc';
};

export class UserQueryParams {
  filters: UserFilterParams;
  public sort?: UserSortParams;
  public page?: number;
  public limit?: number;

  public filterableFields: UserField[];

  constructor({
    filters,
    page,
    limit,
    sort,
  }: {
    filters: UserFilterParams;
    sort?: UserSortParams;
    page?: number;
    limit?: number;
  }) {
    this.filters = filters;
    this.limit = limit;
    this.page = page;
    this.sort = sort;
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
      'currentCountry',
      'numberOfChildren',
      'ageOfOldestChild',
      'ageOfYoungestChild',
      'sunniMadhaib',
      'religiousPractice',
      'bornOrRevertToIslam',
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
            if (rule === 'isnull' || rule === 'isnotnull') {
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
      queryParams.sort = {
        field: field as UserField,
        direction: direction as 'asc' | 'desc',
      };
    }

    return queryParams;
  }
}

export interface UpdateUser {
  user: User;
}

export interface UpdateWorldlyLifestyle {
  userId: string;
  worldlyLifestyle: WorldlyLifestyle;
}

export interface UpdateExpectedWorldlyLifestyle {
  userId: string;
  expectedWorldlyLifestyle:
    | MaleExpectedWorldlyLifestyle
    | FemaleExpectedWorldlyLifestyle;
}

export interface UpdateIslamicLifestyle {
  userId: string;
  islamicLifestyle: MaleIslamicLifestyle | FemaleIslamicLifestyle;
}

export interface UpdateExpectedIslamicLifestyle {
  userId: string;
  expectedIslamicLifestyle:
    | MaleExpectedIslamicLifestyle
    | FemaleExpectedIslamicLifestyle;
}

export interface UpdateMarriageDiscussion {
  userId: string;
  marriageDiscussion: MarriageDiscussion;
}

export interface UpdateFamilyIntroduction {
  userId: string;
  familyIntroduction: FamilyIntroduction;
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
