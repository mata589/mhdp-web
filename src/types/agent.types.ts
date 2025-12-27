// types/agent.types.ts

// ============================================
// COMMON TYPES
// ============================================


export type CallStatus = 'answered' | 'not_answered' | 'voicemail' | 'missed';
export type CallOutcome = 'resolved' | 'unresolved' | 'escalated' | 'not_escalated' | 'not_answered';
export type AvailabilityStatus = 'available' | 'on_call' | 'on_break' | 'offline';
export type PriorityLevel = 'low' | 'medium' | 'high';
export type ResolutionStatus = 'pending' | 'in_progress' | 'resolved';
export type EscalationType = 'manual' | 'automatic';
export type CallerGender = 'male' | 'female' | 'unknown';
export type CallerType = 'new' | 'returning' | 'unknown';
export type Sentiment = 'positive' | 'negative' | 'neutral';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type VoicemailStatus =
  | 'resolved'
  | 'unresolved'
  | 'not_escalated'
  | 'escalated';

export type MissedCallStatus =
  | 'missed'
  | 'returned';
export interface ChangeMetric {
  percent: string;
  trend: 'up' | 'down' | 'no_change';
}

// ============================================
// OVERVIEW & DASHBOARD
// ============================================

export interface AgentOverview {
  total_calls: number;
  total_calls_change: ChangeMetric;
  calls_today: number;
  calls_today_change: ChangeMetric;
  escalated_calls: number;
  escalated_calls_change: ChangeMetric;
  quality_score: string;
  quality_score_change: ChangeMetric;
}

// ============================================
// CALL ACTIVITY
// ============================================

export interface CallActivity {
  call_id: string;
  caller_id: string;
  language: string | null;
  primary_topic: string | null;
  risk_level: RiskLevel;
  outcome: CallOutcome;
  quality_score: number | null;
  call_start_time: string;
  call_end_time: string;
  agent_name: string;
  duration_seconds: number;
  audio_url: string;
}

export interface RecentCallActivityResponse {
  calls: CallActivity[];
}

// ============================================
// AVAILABILITY
// ============================================

export interface AgentAvailabilityResponse {
  first_name: string;
  last_name: string;
  status: AvailabilityStatus;
  updated_at: string;
}

export interface UpdateAvailabilityRequest {
  status: AvailabilityStatus;
}

// ============================================
// VOICEMAILS
// ============================================

export interface Voicemail {
  call_id: string;
  caller_id: string;
  risk_level: RiskLevel;
  call_start_time: string;
  call_end_time: string;
  duration_seconds: number;
  voicemail_transcription: string | null;
  status: 'resolved' | 'unresolved';
  audio_url: string;
}

export interface VoicemailsResponse {
  total_results: number;
  page: number;
  limit: number;
  results: Voicemail[];
}

// ============================================
// MISSED CALLS
// ============================================

export interface MissedCall {
  call_id: string;
  caller_id: string;
  call_count: number;
  risk_level: RiskLevel;
  status: 'missed' | 'returned';
  last_call_start_time: string;
  last_call_end_time: string;
  created_at: string;
  audio_url: string;
}

export interface MissedCallsResponse {
  total_results: number;
  page: number;
  limit: number;
  results: MissedCall[];
}

// ============================================
// CALL HISTORY & DETAILS
// ============================================

export interface CallHistoryItem {
  call_id: string;
  caller_id: string;
  language: string | null;
  primary_topic: string | null;
  risk_level: RiskLevel;
  outcome: CallOutcome;
  quality_score: number | null;
  call_start_time: string;
  call_end_time: string;
  duration_seconds: number;
  audio_url: string;
}

export interface CallHistoryResponse {
  total_results: number;
  page: number;
  limit: number;
  results: CallHistoryItem[];
}

export interface Speaker {
  speaker: 'caller' | 'agent';
  start_time: number;
  end_time: number;
  text: string;
}

export interface DetectedKeyword {
  keyword: string;
  category: string;
  confidence_score: number;
}

export interface TopicDiscussed {
  topic_name: string;
  relevance_score: number;
  is_primary: boolean;
}

export interface Transcript {
  speaker_segments: Speaker[];
}

export interface TransferDetails {
  transferred_to: string;
  transfer_reason: string;
  transfer_time: string;
}

export interface CallDetailsResponse {
  call_id: string;
  caller_id: string;
  risk_level: RiskLevel;
  call_status: CallStatus;
  call_start_time: string;
  call_end_time: string;
  call_duration_seconds: number;
  language: string | null;
  speakers: Speaker[];
  caller_gender: CallerGender;
  caller_type: CallerType;
  caller_age: number | null;
  trajectory_of_care: string | null;
  call_summary: string | null;
  call_notes: string | null;
  audio_url: string;
  agent_sentiment: Sentiment | null;
  caller_sentiment: Sentiment | null;
  conversation_quality: number | null;
  detected_keywords: DetectedKeyword[];
  topics_discussed: TopicDiscussed[];
  transcript: Transcript;
  transfer_details: TransferDetails | null;
  outcome: CallOutcome;
}

// ============================================
// SUPERVISORS
// ============================================

export interface Supervisor {
  user_id: string;
  full_name: string;
  email: string;
  contact: string;
  designation: string;
  roles: string[];
}

export type SupervisorListResponse = Supervisor[];

// ============================================
// ESCALATIONS
// ============================================

export interface EscalateCallRequest {
  call_id: string;
  escalation_reason: string;
  escalation_type: EscalationType;
  priority_level: PriorityLevel;
  escalated_to_id: string;
}

export interface EscalateCallResponse {
  escalation_id: number;
  call_id: string;
  escalated_by: string;
  escalated_to: string;
  escalation_reason: string;
  priority_level: PriorityLevel;
  escalation_type: EscalationType;
  escalation_time: string;
  resolution_status: ResolutionStatus;
  message: string;
}

export interface EscalationsSummary {
  total_escalations: number;
  escalations_today: number;
  critical_alerts: number;
  resolved_today: number;
}

export interface EscalatedCall {
  escalation_id: number;
  call_id: string;
  caller_id: string;
  escalated_by: string;
  escalated_to: string;
  escalation_reason: string;
  priority_level: PriorityLevel;
  risk_level: RiskLevel;
  escalation_time: string;
  resolution_status: ResolutionStatus;
  resolution_notes: string | null;
  resolved_at: string | null;
}

export interface EscalatedCallsResponse {
  total_results: number;
  page: number;
  limit: number;
  results: EscalatedCall[];
}

export interface EscalationDetailsResponse {
  escalation_id: number;
  call_id: string;
  caller_id: string;
  escalated_by: string;
  escalated_to: string;
  escalation_reason: string;
  priority_level: PriorityLevel;
  risk_level: RiskLevel;
  escalation_time: string;
  resolution_status: ResolutionStatus;
  resolution_notes: string | null;
  resolved_at: string | null;
  call_details: CallDetailsResponse;
}

// ============================================
// ANALYTICS
// ============================================

export interface MetricWithChange {
  value: number;
  percentage_change: number;
  comparison_period: string;
}

export interface AgentAnalyticsOverview {
  total_calls: MetricWithChange;
  calls_today: MetricWithChange;
  escalated_calls: MetricWithChange;
  average_call_duration: MetricWithChange;
  quality_score: MetricWithChange;
}

export interface CallVolumeDataPoint {
  hour: string;
  total_calls: number;
  escalated_calls: number;
}

export interface AgentCallVolumeTrends {
  date_range: string;
  volumes: CallVolumeDataPoint[];
}

export interface LeaderboardEntry {
  agent_id: string;
  agent_name: string;
  total_calls: number;
  quality_score: number;
  average_call_duration: number;
  escalation_rate: number;
}

export interface AgentLeaderboard {
  date_range: string;
  leaderboard: LeaderboardEntry[];
}

export interface QualityDataPoint {
  month: string;
  average_quality_score: number;
}

export interface AgentConversationQualityTrends {
  date_range: string;
  data_points: QualityDataPoint[];
}

export interface QualityBreakdown {
  rapport: number;
  listening: number;
  analyzing: number;
  motivating: number;
  ending: number;
  overall_quality: number;
}

export interface AreaForImprovement {
  area_name: string;
  priority_level: 'low' | 'medium' | 'high';
  relevance_score: number;
}

export interface AgentConversationQualityInsights {
  user_id: string;
  period_start: string;
  period_end: string;
  quality_breakdown: QualityBreakdown;
  areas_for_improvement: AreaForImprovement[];
}

// ============================================
// FILTERS & QUERY PARAMS
// ============================================

export interface CallFilters {
  search?: string;
  riskLevel?: RiskLevel;
  callStatus?: CallStatus;
  outcome?: CallOutcome;
  statusFilter?: 'resolved' | 'unresolved' | 'missed' | 'returned';
  limit?: number;
  offset?: number;
}

export interface EscalationFilters {
  search?: string;
  riskLevel?: RiskLevel;
  priorityLevel?: PriorityLevel;
  resolutionStatus?: ResolutionStatus;
  limit?: number;
  offset?: number;
}