// types/designation.types.ts

export interface Designation {
  designation_name: string;
  id: number;
}

export interface CreateDesignationRequest {
  designation_name: string;
}

export interface UpdateDesignationRequest {
  id: number;
  designation_name: string;
}

export interface CreateDesignationResponse {
  message: string;
  id: number;
}

export interface ArchiveDesignationRequest {
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