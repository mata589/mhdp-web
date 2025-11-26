// types/facility.types.ts

export interface Address {
    sub_county?: string;
    district?: string;
    county?: string;
    parish?: string;
    village?: string;
    country?: string;
  }
  
  export interface Facility {
    facility_name: string;
    facility_admin_first_name: string;
    facility_admin_last_name: string;
    facility_admin_designation: string;
    facility_id: string;
    code: string;
    HSD: string;
    level: string;
    is_active: boolean;
    address: Address;
    date_created: string;
  }
  
  export interface CreateFacilityRequest {
    facility_name: string;
    code: string;
    level: string;
    HSD: string;
    sub_county: string;
    district: string;
    county: string;
    parish: string;
    village: string;
    country: string;
  }
  
  export interface UpdateFacilityRequest {
    facility_id: string;
    facility_name: string;
    code: string;
    level: string;
    HSD: string;
    sub_county: string;
    district: string;
    county: string;
    parish: string;
    village: string;
    country: string;
  }
  
  export interface CreateFacilityResponse {
    message: string;
    facility_id: string;
  }
  
  export interface ArchiveFacilityRequest {
    facility_id: string;
  }
  
  export interface ValidationError {
    loc: (string | number)[];
    msg: string;
    type: string;
  }
  
  export interface ErrorResponse {
    detail: string | ValidationError[];
  }