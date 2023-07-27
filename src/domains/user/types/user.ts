import { DepartmentSchema } from '../../department/types';

export type User = {
  id: number;
  name: string;
  created_at: Date;
};

export type PopulatedUser = User & {
  department?: DepartmentSchema;
};

export type UserSchema = User & {
  department_id?: number;
};

export type PopulatedUserSchema = UserSchema & {
  department_name?: string;
  department_created_at?: Date;
};
