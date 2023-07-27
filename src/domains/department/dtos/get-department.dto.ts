import { PaginationArgs, QueryOptions } from '../../../shared/classes';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

export class DepartmentDto {
  id: number;
  name: string;
  createdAt: string;
}

export class DepartmentsFilter {
  @IsOptional()
  @IsString()
  name?: string;
}

export class DepartmentsQueryOptions extends QueryOptions {
  @Type(() => DepartmentsFilter)
  @ValidateNested()
  @IsOptional()
  filter?: DepartmentsFilter;
}

export class DepartmentsArgs extends PaginationArgs {
  @Type(() => DepartmentsQueryOptions)
  @ValidateNested()
  @IsOptional()
  queryOptions?: DepartmentsQueryOptions;
}
