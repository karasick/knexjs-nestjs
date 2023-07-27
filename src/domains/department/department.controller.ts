import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto, DepartmentDto, DepartmentsArgs } from './dtos';
import { PaginatedResult } from '../../shared/types';

@Controller('departments')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Get(':id')
  department(@Param('id') id): Promise<DepartmentDto> {
    return this.departmentService.getById(id);
  }

  @Get()
  departments(
    @Body() args: DepartmentsArgs
  ): Promise<PaginatedResult<DepartmentDto>> {
    const { page, limit, queryOptions = {} } = args;
    const { filter } = queryOptions;
    return this.departmentService.findAllAndPaginate(page, limit, filter);
  }

  @Post()
  addDepartment(@Body() dto: CreateDepartmentDto): Promise<DepartmentDto> {
    return this.departmentService.create(dto);
  }
}
