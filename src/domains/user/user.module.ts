import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserMapper } from './user.mapper';
import { DepartmentModule } from '../department/department.module';

@Module({
  imports: [DepartmentModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserMapper],
})
export class UserModule {}
