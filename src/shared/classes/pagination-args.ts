import { IsNumber, Max, Min } from 'class-validator';

export class PaginationArgs {
  @IsNumber()
  @Max(1000)
  limit: number;

  @IsNumber()
  @Min(1)
  page: number;
}
