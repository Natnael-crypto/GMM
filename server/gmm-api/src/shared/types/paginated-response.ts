export type PaginatedResource<T> = {
  totalItems: number;
  items: T[];
  page: number;
  limit: number;
};
