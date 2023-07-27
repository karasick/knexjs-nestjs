import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { CreateUserDto, UserDto } from './dtos';
import { UserSchema } from './types';

@Injectable()
export class UserRepository {
  constructor(@InjectConnection() private readonly knex: Knex) {
  }
  async findAll() {
    const users = await this.knex.table<UserSchema>('user').where({
      name: 'Test Name',
      department_id: 1,
    });
    console.log(users);
    return [];
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const { firstName, lastName } = createUserDto;
      const users = await this.knex.table('user').insert({
        firstName,
        lastName,
      });
      console.log(users);

      return { fullName: `${firstName} ${lastName}` };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
