import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UserDto, UsersFilter } from './dtos';
import { UserRepository } from './user.repository';
import { UserMapper } from './user.mapper';
import { PaginatedResult } from '../../shared/types';

type User = {
  firstName: string;
  lastName: string;
};

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async getById(id: number): Promise<UserDto> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return this.userMapper.prepareUserDto(user);
  }

  async findAllAndPaginate(
    page: number,
    limit: number,
    filter: UsersFilter = {}
  ): Promise<PaginatedResult<UserDto>> {
    const users =
      await this.userRepository.findAllAndPaginate(page, limit, filter);
    const userDtos =
      users.map(this.userMapper.prepareUserDto);

    return {
      data: userDtos,
      page,
      pageSize: limit,
    };
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return users.map(this.userMapper.prepareUserDto);
  }

  async create(dto: CreateUserDto): Promise<UserDto> {
    const user = await this.userRepository.create(dto);
    return this.userMapper.prepareUserDto(user);
  }
}
