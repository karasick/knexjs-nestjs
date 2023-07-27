import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Sorting {
  @IsNumber()
  @IsOptional()
  order?: 1 | -1;

  @IsString()
  @IsOptional()
  field?: string;
}

export class QueryOptions {
  @Type(() => Sorting)
  @ValidateNested()
  @IsOptional()
  sort?: Sorting;
}
