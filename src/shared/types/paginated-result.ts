export type PaginatedResult<T> = {
  data: T[];
  page: number;
  pageSize: number;
};
