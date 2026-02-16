// types/systemAdmin.types.ts

// ============================================
// SHARED TYPES
// ============================================

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ErrorResponse {
  detail: string | ValidationError[];
}

// ============================================
// OVERVIEW TYPES
// ============================================

export interface MetricWithChange {
  value: number;
  percentage_change: number;
  label: string;
}

export interface SystemAdminOverview {
  total_facilities: MetricWithChange;
  total_users: MetricWithChange;
  total_calls: MetricWithChange;
  calls_today: MetricWithChange;
}

export interface CountMetric {
  label: string;
  count: number;
}

export interface FacilitiesOverview {
  total_facilities: CountMetric;
  active_facilities: CountMetric;
  inactive_facilities: CountMetric;
}

export interface UsersOverview {
  total_users: CountMetric;
  active_users: CountMetric;
  inactive_users: CountMetric;
}

// ============================================
// FULL OVERVIEW TYPES
// ============================================

export interface DetailedMetric {
  label: string;
  value: number;
  percentage_change: number;
  change_label: string;
}

export interface FullOverview {
  total_facilities: MetricData;
  active_facilities: MetricData;
  inactive_facilities: MetricData;
  facilities_added_today: MetricData;
  total_users: MetricData;
  active_users: MetricData;
  inactive_users: MetricData;
  users_added_today: MetricData;
  total_calls: MetricData;
  calls_today: MetricData;
  incoming_calls: MetricData;  // Changed from escalated_calls
  outgoing_calls: MetricData;   // Changed from missed_calls
}

interface MetricData {
  label: string;
  value: number;
  percentage_change: number;
  change_label: string;
}
// ============================================
// FACILITY TYPES
// ============================================

export interface FacilityAddress {
  district: string;
  sub_county: string;
  county: string;
  parish: string;
  village: string;
  country: string;
}

export interface Facility {
  facility_id: string;
  facility_name: string;
  code: string;
  level: string;
  HSD: string;
  is_active: boolean;
  address: FacilityAddress;
  date_created: string;
  facility_admin_first_name?: string;
  facility_admin_last_name?: string;
  facility_admin_designation?: string;
}

export interface FacilityItem {
  facility_id: string;
  facility_name: string;
  level: string;
  district: string;
  country: string;
  HSD: string;
  is_active: boolean;
  date_created: string;
}

export interface FacilitiesListResponse {
  results: FacilityItem[];
  total: number;
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

export interface UpdateFacilityRequest extends CreateFacilityRequest {
  facility_id: string;
}

export interface FacilityPerformanceItem {
  facility_id: string;
  facility_name: string;
  country: string;
  total_calls: number;
}

export interface FacilitiesPerformanceResponse {
  data: FacilityPerformanceItem[];
}

// ============================================
// USER TYPES
// ============================================

export interface FacilityAdmin {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  nationality: string;
  contact: string;
  is_active: boolean;
  facility_id: string;
  designation_name: string;
  role_names: string[];
  address: string;
}

export interface CreateFacilityAdminRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  gender: string;
  nationality: string;
  contact: string;
  is_active: boolean;
  facility_id: string;
  address: string;
}

export interface UpdateFacilityAdminRequest {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  nationality: string;
  contact: string;
  is_active: boolean;
  facility_id: string;
  address: string;
}

export interface UserDistributionItem {
  role: string;
  count: number;
}

export interface UsersDistributionResponse {
  data: UserDistributionItem[];
}

// ============================================
// CALLS / ANALYTICS TYPES
// ============================================

export interface HourlyCallTrend {
  hour: string;
  total_calls: number;
}

export interface HourlyCallTrendsResponse {
  data: HourlyCallTrend[];
}