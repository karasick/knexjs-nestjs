import { Department } from '../../department/types';

export type UserSchema = {
  id: number;
  name: string;
  created_at: string;

  department_id: number;
}

export type User = {
  id: number;
  name: string;
  createdAt: Date;

  department: Department;
}
