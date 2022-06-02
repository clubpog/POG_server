import { IsNotEmpty, IsPositive, Max } from 'class-validator';
import { Type } from 'class-transformer';

export abstract class PageRequest {
  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  page: number | 1;

  @IsNotEmpty()
  @IsPositive()
  @Max(100)
  @Type(() => Number)
  limit: number | 10;

  getOffset(): number {
    return (this.page - 1) * this.limit;
  }

  getLimit(): number {
    return this.limit;
  }

  getPage(): number {
    return this.page;
  }
}
