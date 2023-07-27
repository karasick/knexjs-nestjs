import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { CreateDepartmentDto, DepartmentsFilter } from './dtos';
import { DepartmentSchema } from './types';

@Injectable()
export class DepartmentRepository {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async getById(id: number): Promise<DepartmentSchema | undefined> {
    const [department] = await this.knex
      .table<DepartmentSchema>('departments')
      .where({
        id,
      });

    return department;
  }

  async findAllAndPaginate(
    page = 1,
    limit = 10,
    filter: DepartmentsFilter = {},
  ): Promise<DepartmentSchema[]> {
    const offset = (page - 1) * limit;

    const departments = await this.knex
      .table<DepartmentSchema>('departments')
      .where(filter)
      .offset(offset)
      .limit(limit);

    return departments;
  }

  async findAll(filter: DepartmentsFilter = {}): Promise<DepartmentSchema[]> {
    const departments = await this.knex
      .table<DepartmentSchema>('departments')
      .where(filter);

    return departments;
  }

  async create(createUserDto: CreateDepartmentDto): Promise<DepartmentSchema> {
    const { name } = createUserDto;

    const possibleReturn: DepartmentSchema = {
      id: 1,
      name: 'Return name',
      created_at: new Date(),
    };
    const returnKeys = Object.keys(possibleReturn);

    const [department] = await this.knex
      .table<DepartmentSchema>('departments')
      .insert({
        name,
      })
      .returning<DepartmentSchema[]>(returnKeys);

    return department;
  }
}
