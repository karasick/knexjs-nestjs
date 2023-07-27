import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { DepartmentRepository } from './department.repository';
import { DepartmentMapper } from './department.mapper';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService, DepartmentRepository, DepartmentMapper],
})
export class DepartmentModule {}
