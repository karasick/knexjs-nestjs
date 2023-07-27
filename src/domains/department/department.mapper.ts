import { Injectable } from '@nestjs/common';
import { DepartmentSchema } from './types';
import { DepartmentDto } from './dtos';

@Injectable()
export class DepartmentMapper {
  prepareDepartmentDto(department: DepartmentSchema): DepartmentDto {
    return {
      id: department.id,
      name: department.name,
      createdAt: department.created_at.toISOString(),
    };
  }
}
