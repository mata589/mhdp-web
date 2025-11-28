// types/user.types.ts

// ============================================
// OVERVIEW & DASHBOARD TYPES
// ============================================

export interface ChangeMetric {
  percent: string;
  trend: "increase" | "decrease";
}

export interface UserOverview {
  calls_today: number;
  calls_today_change: ChangeMetric;
  escalated_calls: number;
  escalated_calls_change: ChangeMetric;
  quality_score: string;
  quality_score_change: ChangeMetric;
  total_calls: number;
  total_calls_change: ChangeMetric;
}

// ============================================
// CALL ACTIVITY TYPES
// ============================================

export interface RecentCallActivity {
  agent_name: string;
  call_end_time: string;
  call_id: string;
  call_start_time: string;
  caller_id: string;
  duration_seconds: number;
  language: string;
  outcome: string;
  primary_topic: string;
  quality_score: string;
  risk_level: string;
}

export interface RecentCallActivityResponse {
  calls: RecentCallActivity[];
}

// ============================================
// AVAILABILITY TYPES
// ============================================

export type UserStatus = "available" | "busy" | "offline" | "away";

export interface UserAvailability {
  first_name: string;
  last_name: string;
  status: UserStatus;
  updated_at: string;
}

// ============================================
// VOICEMAIL TYPES
// ============================================

export interface Voicemail {
  call_id: string;
  caller_id: string;
  language: string;
  primary_topic: string;
  risk_level: "low" | "medium" | "high" | "critical";
  status: "resolved" | "pending" | "escalated";
  audio_file_path: string;
  created_at: string;
  call_start_time: string;
  call_end_time: string;
  duration_seconds: number;
}

export interface VoicemailsResponse {
  total_results: number;
  page: number;
  limit: number;
  results: Voicemail[];
}

// ============================================
// MISSED CALLS TYPES
// ============================================

export interface MissedCall {
  caller_id: string;
  call_count: number;
  risk_level: "low" | "medium" | "high" | "critical";
  status: "missed" | "returned" | "resolved";
  last_call_id: string;
  last_call_start_time: string;
  last_call_end_time: string;
  created_at: string;
}

export interface MissedCallsResponse {
  total_results: number;
  page: number;
  limit: number;
  results: MissedCall[];
}

// ============================================
// CALL HISTORY TYPES
// ============================================

export interface CallHistoryItem {
  call_id: string;
  caller_id: string;
  primary_topic: string;
  risk_level: "low" | "medium" | "high" | "critical";
  outcome: "resolved" | "escalated" | "pending" | "missed";
  quality_score: number;
  language: string;
  call_start_time: string;
  call_end_time: string;
  created_at: string;
}

export interface CallHistoryResponse {
  total_results: number;
  page: number;
  limit: number;
  results: CallHistoryItem[];
}

// ============================================
// ESCALATION TYPES
// ============================================

export interface EscalateCallRequest {
  call_id: string;
  escalation_reason: string;
  escalation_type: "manual" | "automatic";
  priority_level: "low" | "medium" | "high" | "critical";
  escalated_to_id: string;
}

export interface EscalateCallResponse {
  escalation_id: string;
  message: string;
}

export interface EscalationsSummary {
  total_escalations: number;
  escalations_today: number;
  critical_alerts: number;
}

export interface EscalationListItem {
  escalation_id: string;
  caller_id: string;
  primary_topic: string;
  language: string;
  escalation_reason: string;
  priority_level: string;
  risk_level: string;
  escalation_type: string;
  resolution_status: string;
  created_at: string;
}

export interface EscalationsListResponse {
  total_results: number;
  page: number;
  limit: number;
  results: EscalationListItem[];
}

export interface ConversationQuality {
  analyzing_score: number;
  assessment_model_version: string;
  ending_score: number;
  listening_score: number;
  motivating_score: number;
  overall_quality_score: number;
  rapport_score: number;
}

export interface DetectedKeyword {
  keyword: string;
}

export interface TopicDiscussed {
  topic_name: string;
  relevance_score: number;
}

export interface EscalationDetails {
  escalation_id: string;
  call_id: string;
  caller_id: string;
  risk_level: "low" | "medium" | "high" | "critical";
  priority_level: "low" | "medium" | "high" | "critical";
  escalation_reason: string;
  escalation_type: "manual" | "automatic";
  resolution_status: "in_progress" | "resolved" | "pending";
  trajectory_of_care: string;
  escalated_to: string;
  escalated_by: string;
  call_summary: string;
  call_notes: string;
  conversation_quality: ConversationQuality;
  detected_keywords: DetectedKeyword[];
  topics_discussed: TopicDiscussed[];
  agent_sentiment: string;
  caller_sentiment: string;
  call_start_time: string;
  call_end_time: string;
  created_at: string;
}

// ============================================
// ANALYTICS TYPES
// ============================================

export interface MetricWithChange {
  value: number;
  percentage_change: number;
  comparison_period: string;
}

export interface AnalyticsOverview {
  calls_today: MetricWithChange;
  total_calls: MetricWithChange;
  escalated_calls: MetricWithChange;
  quality_score: MetricWithChange;
  average_call_duration: MetricWithChange;
}

export interface CallVolumeHour {
  hour: string;
  total_calls: number;
  escalated_calls: number;
}

export interface CallVolumeTrends {
  date: string;
  volumes: CallVolumeHour[];
}

export interface LeaderboardEntry {
  rank: number;
  agent_name: string;
  total_calls: number;
  critical_calls: number;
  average_quality_score: number;
}

export interface Leaderboard {
  date_range: string;
  leaderboard: LeaderboardEntry[];
}

export interface QualityTrendDataPoint {
  month: string;
  average_quality_score: number;
}

export interface ConversationQualityTrends {
  date_range: string;
  data_points: QualityTrendDataPoint[];
}

export interface QualityBreakdown {
  overall_quality: number;
  rapport: number;
  listening: number;
  analyzing: number;
  motivating: number;
  ending: number;
}

export interface ImprovementArea {
  area_name: string;
  relevance_score: number;
  priority_level: "low" | "medium" | "high";
}

export interface ConversationQualityInsights {
  user_id: string;
  period_start: string;
  period_end: string;
  quality_breakdown: QualityBreakdown;
  areas_for_improvement: ImprovementArea[];
}

// ============================================
// ERROR TYPES
// ============================================

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ErrorResponse {
  detail: string | ValidationError[];
}