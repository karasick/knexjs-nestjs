import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserDto } from './dtos';
import { DepartmentDto, DepartmentsArgs } from '../department/dtos';
import { PaginatedResult } from '../../shared/types';

@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get(':id')
  user(@Param('id') id): Promise<UserDto> {
    return this.usersService.getById(id);
  }

  @Get()
  users(
    @Body() args: DepartmentsArgs
  ): Promise<PaginatedResult<UserDto>> {
    const { page, limit, queryOptions = {} } = args;
    const { filter } = queryOptions;
    return this.usersService.findAllAndPaginate(page, limit, filter);
  }

  @Post()
  create(@Body() dto: CreateUserDto): Promise<UserDto> {
    return this.usersService.create(dto);
  }
}
