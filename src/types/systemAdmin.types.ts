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
  total_facilities: DetailedMetric;
  active_facilities: DetailedMetric;
  inactive_facilities: DetailedMetric;
  facilities_added_today: DetailedMetric;
  total_users: DetailedMetric;
  active_users: DetailedMetric;
  inactive_users: DetailedMetric;
  users_added_today: DetailedMetric;
  total_calls: DetailedMetric;
  calls_today: DetailedMetric;
  escalated_calls: DetailedMetric;
  missed_calls: DetailedMetric;
}

// ============================================
// FACILITIES TYPES
// ============================================

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
// CALLS TYPES
// ============================================

export interface HourlyCallTrend {
  hour: string;
  total_calls: number;
}

export interface HourlyCallTrendsResponse {
  data: HourlyCallTrend[];
}

// ============================================
// USERS TYPES
// ============================================

export interface UserDistributionItem {
  role: string;
  count: number;
}

export interface UsersDistributionResponse {
  data: UserDistributionItem[];
}