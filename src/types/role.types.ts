// types/role.types.ts

export interface Role {
  role_name: string;
  id: number;
}

export interface CreateRoleRequest {
  role_name: string;
}

export interface UpdateRoleRequest {
  id: number;
  role_name: string;
}

export interface CreateRoleResponse {
  message: string;
  id: number;
}

export interface ArchiveRoleRequest {
  id: number;
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ErrorResponse {
  detail: string | ValidationError[];
}