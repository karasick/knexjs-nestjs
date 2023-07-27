import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DepartmentRepository } from './department.repository';
import { DepartmentMapper } from './department.mapper';
import { DepartmentDto, DepartmentsFilter } from './dtos';
import { PaginatedResult } from '../../shared/types';

@Injectable()
export class DepartmentService {
  constructor(
    private departmentRepository: DepartmentRepository,
    private readonly departmentMapper: DepartmentMapper
  ) {}

  async getById(id: number): Promise<DepartmentDto> {
    const department = await this.departmentRepository.getById(id);
    if (!department) {
      throw new NotFoundException();
    }

    return this.departmentMapper.prepareDepartmentDto(department);
  }

  async findAllAndPaginate(
    page: number,
    limit: number,
    filter: DepartmentsFilter = {}
  ): Promise<PaginatedResult<DepartmentDto>> {
    const departments =
      await this.departmentRepository.findAllAndPaginate(page, limit, filter);

    const departmentDtos =
      departments.map(this.departmentMapper.prepareDepartmentDto);

    return {
      data: departmentDtos,
      page,
      pageSize: limit,
    };
  }

  async findAll(filter: DepartmentsFilter = {}): Promise<DepartmentDto[]> {
    const departments =
      await this.departmentRepository.findAll(filter);

    return departments.map(this.departmentMapper.prepareDepartmentDto)
  }

  async create(dto): Promise<DepartmentDto> {
    try {
      const department = await this.departmentRepository.create(dto);
      return this.departmentMapper.prepareDepartmentDto(department);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
