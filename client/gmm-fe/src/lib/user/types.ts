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

export interface UserFilterableParams {
  firstName?: {
    rule: string;
    value: string | null;
  };
  lastName?: {
    rule: string;
    value: string | null;
  };
  email?: {
    rule: string;
    value: string | null;
  };
  phoneNumber?: {
    rule: string;
    value: string | null;
  };
  age?: {
    rule: string;
    value: string | null;
  };
  gender?: {
    rule: string;
    value: string | null;
  };
  height?: {
    rule: string;
    value: string | null;
  };
  weight?: {
    rule: string;
    value: string | null;
  };
  country?: {
    rule: string;
    value: string | null;
  };
  city?: {
    rule: string;
    value: string | null;
  };
  skinColor?: {
    rule: string;
    value: string | null;
  };
  languages?: {
    rule: string;
    value: string | null;
  };
  nationality?: {
    rule: string;
    value: string | null;
  };
  numberOfChildren?: {
    rule: string;
    value: string | null;
  };
  ageOfOldestChild?: {
    rule: string;
    value: string | null;
  };
  ageOfYoungestChild?: {
    rule: string;
    value: string | null;
  };
  sunniMadhaib?: {
    rule: string;
    value: string | null;
  };
  religiousPractice?: {
    rule: string;
    value: string | null;
  };
  bornMuslim?: {
    rule: string;
    value: string | null;
  };
  drinks?: {
    rule: string;
    value: string | null;
  };
  smokes?: {
    rule: string;
    value: string | null;
  };
  drugs?: {
    rule: string;
    value: string | null;
  };
  tattoos?: {
    rule: string;
    value: string | null;
  };
  maritalStatus?: {
    rule: string;
    value: string | null;
  };
}

export class UserQueryParams {
  filter: UserFilterableParams;
  public page?: number;
  public limit?: number;
  public sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };

  private filterableFields: (keyof UserFilterableParams)[];

  constructor({
    filter,
    page,
    limit,
    sort,
  }: {
    filter: UserFilterableParams;
    page?: number;
    limit?: number;
    sort?: {
      field: string;
      direction: 'asc' | 'desc';
    };
  }) {
    this.filter = filter;
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
      .filter((field) => this.filter[field])
      .map((field) => {
        const filter = this.filter[field]!;
        if (filter.value === null) {
          return `${field}:${filter.rule}`;
        } else {
          return `${field}:${filter.rule}:${filter.value}`;
        }
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
      filter: {},
    });

    const params = new URLSearchParams(queryString);

    if (params.has('filter')) {
      const filters = params.get('filter')?.split(',');
      filters?.forEach((filter) => {
        const [field, rule, value] = filter.split(':');
        queryParams.filter[field as keyof UserFilterableParams] = {
          rule,
          value: value === undefined ? null : value,
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

export class QueryParams {
  public filters?: {
    field: string;
    rule: string;
    value: string | null;
  }[];
  public page?: number;
  public limit?: number;
  public sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };

  constructor({
    filters,
    page,
    limit,
    sort,
  }: {
    filters?: { field: string; rule: string; value: string | null }[];
    page?: number;
    limit?: number;
    sort?: {
      field: string;
      direction: 'asc' | 'desc';
    };
  }) {
    this.filters = filters;
    this.page = page;
    this.limit = limit;
    this.sort = sort;
  }

  public toQueryString(): string {
    let queries = [];
    let filterString = '';

    if (this.filters) {
      filterString = this.filters
        .map((filter) => {
          if (filter.value === null) {
            return `${filter.field}:${filter.rule}`;
          } else {
            return `${filter.field}:${filter.rule}:${filter.value}`;
          }
        })
        .join(',');
      queries.push(`filter=${filterString}`);
    }

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

  public static fromQueryString(queryString: string): QueryParams {
    const queryParams = new QueryParams({});

    const params = new URLSearchParams(queryString);

    if (params.has('filter')) {
      const filters = params.get('filter')?.split(',');
      queryParams.filters = filters?.map((filter) => {
        const [field, rule, value] = filter.split(':');
        return { field, rule, value: value === undefined ? null : value };
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
