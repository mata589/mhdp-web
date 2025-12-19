// src/types/user.types.ts

// ============================================
// AUTH TYPES
// ============================================

export interface User {
  role?: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  designation_name: string;
  role_names: string[];
  
}
// Add this to the AUTH TYPES section
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  designation?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

// ============================================
// USER STATUS & AVAILABILITY
// ============================================

export type UserStatus = 'available' | 'busy' | 'away' | 'offline';

export interface UserAvailability {
  status: UserStatus;
  last_updated: string;
  user_email: string;
}

// ============================================
// DASHBOARD & OVERVIEW
// ============================================

export interface UserOverview {
  total_calls: number;
  answered_calls: number;
  missed_calls: number;
  voicemails: number;
  average_call_duration: number;
  total_call_time: number;
  escalations: number;
  user_availability: UserAvailability;
}

// ============================================
// CALL ACTIVITY
// ============================================

export interface CallActivity {
  id: string;
  caller_name: string;
  caller_phone: string;
  call_type: 'inbound' | 'outbound';
  status: 'answered' | 'missed' | 'voicemail';
  duration: number;
  timestamp: string;
  notes?: string;
}

export interface RecentCallActivityResponse {
  calls: CallActivity[];
  total: number;
  limit: number;
  offset: number;
}

// ============================================
// VOICEMAILS
// ============================================

export interface Voicemail {
  id: string;
  caller_name: string;
  caller_phone: string;
  duration: number;
  timestamp: string;
  transcription?: string;
  audio_url?: string;
  is_read: boolean;
}

export interface VoicemailsResponse {
  voicemails: Voicemail[];
  total: number;
  limit: number;
  offset: number;
}

// ============================================
// MISSED CALLS
// ============================================

export interface MissedCall {
  id: string;
  caller_name: string;
  caller_phone: string;
  timestamp: string;
  attempted_callbacks: number;
  last_callback_attempt?: string;
}

export interface MissedCallsResponse {
  missed_calls: MissedCall[];
  total: number;
  limit: number;
  offset: number;
}

// ============================================
// CALL HISTORY
// ============================================

export interface CallHistoryItem {
  id: string;
  caller_name: string;
  caller_phone: string;
  call_type: 'inbound' | 'outbound';
  status: 'completed' | 'missed' | 'voicemail' | 'abandoned';
  duration: number;
  timestamp: string;
  agent_name: string;
  notes?: string;
  recording_url?: string;
}

export interface CallHistoryResponse {
  calls: CallHistoryItem[];
  total: number;
  limit: number;
  offset: number;
}

// ============================================
// ESCALATIONS
// ============================================

export interface EscalateCallRequest {
  call_id: string;
  reason: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  notes?: string;
  escalate_to?: string; // supervisor email or role
}

export interface EscalateCallResponse {
  escalation_id: string;
  status: 'pending' | 'assigned' | 'in_progress' | 'resolved';
  created_at: string;
  assigned_to?: string;
  message: string;
}

export interface EscalationsSummary {
  total_escalations: number;
  pending: number;
  in_progress: number;
  resolved: number;
  average_resolution_time: number;
}

export interface Escalation {
  id: string;
  call_id: string;
  caller_name: string;
  reason: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'assigned' | 'in_progress' | 'resolved';
  created_at: string;
  resolved_at?: string;
  assigned_to?: string;
  escalated_by: string;
}

export interface EscalationsListResponse {
  escalations: Escalation[];
  total: number;
  limit: number;
  offset: number;
}

export interface EscalationDetails extends Escalation {
  notes: string;
  resolution_notes?: string;
  call_details: CallHistoryItem;
  timeline: EscalationTimelineItem[];
}

export interface EscalationTimelineItem {
  timestamp: string;
  action: string;
  performed_by: string;
  notes?: string;
}

// ============================================
// ANALYTICS
// ============================================

export interface AnalyticsOverview {
  period: string;
  total_calls: number;
  answered_calls: number;
  missed_calls: number;
  average_handle_time: number;
  first_call_resolution_rate: number;
  customer_satisfaction_score: number;
}

export interface CallVolumeData {
  date: string;
  inbound: number;
  outbound: number;
  total: number;
}

export interface CallVolumeTrends {
  period: string;
  data: CallVolumeData[];
}

export interface LeaderboardEntry {
  rank: number;
  agent_name: string;
  agent_email: string;
  total_calls: number;
  average_handle_time: number;
  customer_satisfaction_score: number;
}

export interface Leaderboard {
  period: string;
  entries: LeaderboardEntry[];
}

export interface QualityTrendData {
  date: string;
  score: number;
  call_count: number;
}

export interface ConversationQualityTrends {
  period: string;
  data: QualityTrendData[];
  average_score: number;
}

export interface QualityInsight {
  category: string;
  score: number;
  improvement_suggestions: string[];
}

export interface ConversationQualityInsights {
  overall_score: number;
  insights: QualityInsight[];
  top_strengths: string[];
  areas_for_improvement: string[];
}