import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { PaginationArgs, QueryOptions } from '../../../shared/classes';
import { Type } from 'class-transformer';
import { DepartmentSchema } from '../../department/types';

export class UserDto {
  id: number;
  name: string;
  createdAt: string;

  departmentId?: number;
}

export class PopulatedUserDto extends UserDto {
  department: DepartmentSchema;
}

export class UsersFilter {
  @IsOptional()
  @IsString()
  name?: string;

  // @IsArray()
  // @IsOptional()
  // departments?: number[];
}

export class UsersQueryOptions extends QueryOptions {
  @Type(() => UsersFilter)
  @ValidateNested()
  @IsOptional()
  filter?: UsersFilter;
}

export class UsersArgs extends PaginationArgs {
  @Type(() => UsersQueryOptions)
  @ValidateNested()
  @IsOptional()
  queryOptions?: UsersQueryOptions;
}
