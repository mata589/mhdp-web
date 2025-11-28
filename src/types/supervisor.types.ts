// types/supervisor.types.ts

// ============================================
// SHARED TYPES
// ============================================

export interface ChangeMetric {
  percent: string;
  trend: "increase" | "decrease";
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ErrorResponse {
  detail: string | ValidationError[];
}

// ============================================
// OVERVIEW & DASHBOARD TYPES
// ============================================

export interface SupervisorOverview {
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
// CALL VOLUME TYPES
// ============================================

export interface CallVolumeHour {
  hour: string;
  total_calls: number;
  escalated_calls: number;
}

export interface CallVolumeTrends {
  date_range: string;
  volumes: CallVolumeHour[];
}

// ============================================
// AGENT STATUS TYPES
// ============================================

export interface AgentStatus {
  agent_id: string;
  agent_name: string;
  status: string;
  call_duration: string;
  quality_score: number;
}

export interface AgentStatusMonitor {
  agents: AgentStatus[];
  last_updated: string;
}

// ============================================
// ESCALATIONS TYPES
// ============================================

export interface EscalationItem {
  escalation_id: string;
  caller_id: string;
  agent_name: string;
  escalation_reason: string;
  priority_level: string;
  risk_level: string;
  resolution_status: string;
  sent_at: string;
}

export interface EscalationsOverview {
  escalations: EscalationItem[];
  total_results: number;
  page: number;
  limit: number;
}

export interface UpdateEscalationRequest {
  escalation_id: string;
  resolution_status: "in_progress" | "resolved" | "pending";
  trajectory_of_care: string;
  resolution_notes: string;
}

export interface UpdateEscalationResponse {
  escalation_id: string;
  message: string;
}

export interface EscalationsSummary {
  total_escalations: number;
  escalations_today: number;
  critical_alerts: number;
  resolved_today: number;
}

export interface EscalatedCallItem {
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

export interface EscalatedCallsResponse {
  total_results: number;
  page: number;
  limit: number;
  results: EscalatedCallItem[];
}

// ============================================
// STAFF PERFORMANCE TYPES
// ============================================

export interface StaffMember {
  agent_id: string;
  agent_name: string;
  status: string;
  calls_handled: number;
  escalations: number;
  quality_score: number;
  last_active: string;
}

export interface StaffPerformance {
  staff: StaffMember[];
  total_results: number;
  page: number;
  limit: number;
}

export interface StaffAvailabilitySummary {
  total_staff: number;
  available: number;
  on_call: number;
  on_break: number;
}

// ============================================
// LIVE MONITORING TYPES
// ============================================

export interface ActiveCall {
  call_id: string;
  agent_name: string;
  call_status: string;
  duration: string;
  risk_level: string;
  start_time: string;
}

export interface LiveMonitoring {
  active_calls: ActiveCall[];
  total_active_calls: number;
  last_updated: string;
}

// ============================================
// VOICEMAIL & MISSED CALLS TYPES
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
// ANALYTICS TYPES
// ============================================

export interface AnalyticsOverview {
  calls_today: number;
  calls_today_change: ChangeMetric;
  total_calls: number;
  total_calls_change: ChangeMetric;
  escalated_calls: number;
  escalated_calls_change: ChangeMetric;
  missed_calls: number;
  missed_calls_change: ChangeMetric;
  voicemail_calls: number;
  voicemail_calls_change: ChangeMetric;
  transferred_calls: number;
  transferred_calls_change: ChangeMetric;
  avg_call_duration: string;
  avg_call_duration_change: ChangeMetric;
  avg_conversation_score: string;
  avg_conversation_score_change: ChangeMetric;
}

export interface DetailedCallVolumeHour {
  hour: string;
  total_calls: number;
  escalated_calls: number;
  missed_calls: number;
  voicemail_calls: number;
}

export interface DetailedCallVolumeTrends {
  date_range: string;
  volumes: DetailedCallVolumeHour[];
}

export interface CriticalAlert {
  alert_type: string;
  count: number;
  percentage: number;
}

export interface CriticalAlertDistribution {
  total_alerts: number;
  alerts: CriticalAlert[];
}

export interface LeaderboardEntry {
  rank: number;
  first_name: string;
  last_name: string;
  total_calls: number;
  critical_calls: number;
  average_quality_score: number;
}

export interface Leaderboard {
  date_range: string;
  leaderboard: LeaderboardEntry[];
}

export interface SentimentHour {
  hour: string;
  positive: number;
  neutral: number;
  negative: number;
}

export interface CallerSentimentTrends {
  date_range: string;
  sentiments: SentimentHour[];
}

export interface GenderBreakdownItem {
  gender: string;
  count: number;
  percentage: number;
}

export interface GenderBreakdown {
  total_callers: number;
  breakdown: GenderBreakdownItem[];
}

export interface LanguageUsageItem {
  language: string;
  count: number;
  percentage: number;
}

export interface LanguageUsage {
  total_calls: number;
  usage: LanguageUsageItem[];
}

export interface CallerTypeBreakdownItem {
  caller_type: string;
  count: number;
  percentage: number;
}

export interface CallerTypeBreakdown {
  total_calls: number;
  breakdown: CallerTypeBreakdownItem[];
}

export interface TrajectoryOfCareItem {
  trajectory_of_care: string;
  count: number;
  percentage: number;
}

export interface TrajectoryOfCare {
  total_records: number;
  distribution: TrajectoryOfCareItem[];
}

export interface TopicBreakdownItem {
  topic_name: string;
  count: number;
  percentage: number;
}

export interface TopicBreakdown {
  total_calls: number;
  breakdown: TopicBreakdownItem[];
}

export interface CallOutcomeItem {
  outcome: string;
  count: number;
  percentage: number;
}

export interface CallOutcomes {
  total_calls: number;
  breakdown: CallOutcomeItem[];
}

export interface TopicTrendDataPoint {
  month: string;
  count: number;
}

export interface TopicTrend {
  topic_name: string;
  data: TopicTrendDataPoint[];
}

export interface TopicTrends {
  year: number;
  topics: TopicTrend[];
}

export interface QualityMetric {
  title: string;
  value: number;
  change_percent: number;
  comparison: string;
  trend: "up" | "down";
}

export interface QualityOverview {
  avg_conversation_score: QualityMetric;
  audio_quality: QualityMetric;
  network_quality: QualityMetric;
}

export interface QualityTrendDataPoint {
  month: string;
  average_score: number;
}

export interface ConversationQualityTrends {
  data: QualityTrendDataPoint[];
}

export interface DialoguePhase {
  phase: string;
  percentage: number;
}

export interface DialogueAnalysis {
  phases: DialoguePhase[];
}

export interface AgentQuality {
  agent_name: string;
  overall_quality: number;
  rapport: number;
  listening: number;
  analysing: number;
  motivating: number;
  ending: number;
}

export interface AgentConversationQuality {
  start_date: string;
  end_date: string;
  agents: AgentQuality[];
}

export interface ImprovementArea {
  area_name: string;
  area_description: string;
  agents_needing_improvement: number;
  average_quality_score: number;
  priority: "high" | "medium" | "low";
}

export interface AreasForImprovement {
  total_items: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  areas: ImprovementArea[];
}

export interface NetworkAudioQualityTrend {
  month: string;
  network_quality: number;
  audio_quality: number;
}

export interface NetworkAudioQualityTrends {
  trends: NetworkAudioQualityTrend[];
}