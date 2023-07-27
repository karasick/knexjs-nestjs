import { Injectable } from '@nestjs/common';
import { PopulatedUser, PopulatedUserSchema, UserSchema } from './types';
import { UserDto } from './dtos';
import { DepartmentMapper } from '../department/department.mapper';

@Injectable()
export class UserMapper {
  constructor(private readonly departmentMapper: DepartmentMapper) {}

  prepareUserDto(user: UserSchema): UserDto {
    return {
      id: user.id,
      name: user.name,
      createdAt: user.created_at.toISOString(),
      departmentId: user.department_id,
    };
  }

  preparePopulatedUserDto(user: PopulatedUser): UserDto {
    const department = user.department;
    const departmentDto =
      department && this.departmentMapper.prepareDepartmentDto(department);

    return {
      id: user.id,
      name: user.name,
      createdAt: user.created_at.toISOString(),
      ...(departmentDto && {
        department: departmentDto,
      }),
    };
  }

  simplifyPopulatedUser(user: PopulatedUserSchema): PopulatedUser {
    const hasDepartment =
      !!user.department_id &&
      !!user.department_name &&
      !!user.department_created_at;

    const department = hasDepartment && {
      id: user.department_id!,
      name: user.department_name!,
      created_at: user.created_at!,
    };

    console.log(department);

    return {
      id: user.id,
      name: user.name,
      created_at: user.created_at,
      ...(department && { department }),
    };
  }
}
