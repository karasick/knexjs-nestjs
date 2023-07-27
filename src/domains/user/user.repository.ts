import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { CreateUserDto, UsersFilter } from './dtos';
import { PopulatedUser, PopulatedUserSchema, User, UserSchema } from './types';
import { DepartmentSchema } from '../department/types';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly userMapper: UserMapper,
  ) {}

  async getById(id: number): Promise<User | undefined> {
    const [user] = await this.knex.table<User>('carbmee_users').where({
      id,
    });

    return user;
  }

  async findAllAndPaginate(
    page = 1,
    limit = 10,
    filter: UsersFilter = {},
  ): Promise<PopulatedUser[]> {
    const offset = (page - 1) * limit;

    const users = await this.knex
      .table<UserSchema>('carbmee_users')
      .where(filter)
      .join<DepartmentSchema>('departments', {
        'carbmee_users.department_id': 'departments.id',
      })
      .select<PopulatedUserSchema[]>([
        this.knex.ref('id').withSchema('carbmee_users'),
        this.knex.ref('name').withSchema('carbmee_users'),
        this.knex.ref('created_at').withSchema('carbmee_users'),

        this.knex.ref('id').as('department_id').withSchema('departments'),
        this.knex.ref('name').as('department_name').withSchema('departments'),
        this.knex
          .ref('created_at')
          .as('department_created_at')
          .withSchema('departments'),
      ])
      .offset(offset)
      .limit(limit);

    return users.map(this.userMapper.simplifyPopulatedUser);
  }

  async findAll(filter: UsersFilter = {}) {
    const users = await this.knex.table<User>('carbmee_users').where(filter);

    return users;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, departmentId } = createUserDto;

    const possibleReturn: UserSchema = {
      id: 1,
      name: 'Return name',
      created_at: new Date(),
      department_id: 1,
    };
    const returnKeys = Object.keys(possibleReturn);

    const [user] = await this.knex
      .table<UserSchema>('carbmee_users')
      .insert({
        name,
        department_id: departmentId,
      })
      .returning<UserSchema[]>(returnKeys);

    return user;
  }
}
