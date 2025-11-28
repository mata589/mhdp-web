// api/supervisorApi.ts
import type {
  SupervisorOverview,
  CallVolumeTrends,
  AgentStatusMonitor,
  EscalationsOverview,
  StaffPerformance,
  LiveMonitoring,
  UpdateEscalationRequest,
  UpdateEscalationResponse,
  EscalationsSummary,
  EscalatedCallsResponse,
  VoicemailsResponse,
  MissedCallsResponse,
  CallHistoryResponse,
  StaffAvailabilitySummary,
  AnalyticsOverview,
  DetailedCallVolumeTrends,
  CriticalAlertDistribution,
  Leaderboard,
  CallerSentimentTrends,
  GenderBreakdown,
  LanguageUsage,
  CallerTypeBreakdown,
  TrajectoryOfCare,
  TopicBreakdown,
  CallOutcomes,
  TopicTrends,
  QualityOverview,
  ConversationQualityTrends,
  DialogueAnalysis,
  AgentConversationQuality,
  AreasForImprovement,
  NetworkAudioQualityTrends,
} from "../../types/supervisor.types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class SupervisorApi {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'API request failed');
    }
    return response.json();
  }

  // ============================================
  // OVERVIEW & DASHBOARD
  // ============================================

  async getOverview(): Promise<SupervisorOverview> {
    const response = await fetch(`${API_BASE_URL}/supervisor/overview`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<SupervisorOverview>(response);
  }

  async getCallVolumeTrends(): Promise<CallVolumeTrends> {
    const response = await fetch(`${API_BASE_URL}/supervisor/call-volume-trends`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<CallVolumeTrends>(response);
  }

  async getAgentStatusMonitor(): Promise<AgentStatusMonitor> {
    const response = await fetch(`${API_BASE_URL}/supervisor/agent-status-monitor`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<AgentStatusMonitor>(response);
  }

  // ============================================
  // ESCALATIONS
  // ============================================

  async getEscalationsOverview(page: number = 1, limit: number = 10): Promise<EscalationsOverview> {
    const response = await fetch(
      `${API_BASE_URL}/supervisor/escalations-overview?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<EscalationsOverview>(response);
  }

  async updateEscalation(data: UpdateEscalationRequest): Promise<UpdateEscalationResponse> {
    const response = await fetch(`${API_BASE_URL}/supervisor/supervisor/update-escalation`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<UpdateEscalationResponse>(response);
  }

  async getEscalationsSummary(): Promise<EscalationsSummary> {
    const response = await fetch(`${API_BASE_URL}/supervisor/escalations_summary`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<EscalationsSummary>(response);
  }

  async listEscalatedCalls(limit: number = 10, offset: number = 0): Promise<EscalatedCallsResponse> {
    const response = await fetch(
      `${API_BASE_URL}/supervisor/list_escalated_calls?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<EscalatedCallsResponse>(response);
  }

  // ============================================
  // STAFF MANAGEMENT
  // ============================================

  async getStaffPerformance(page: number = 1, limit: number = 10): Promise<StaffPerformance> {
    const response = await fetch(
      `${API_BASE_URL}/supervisor/staff-performance?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<StaffPerformance>(response);
  }

  async getStaffAvailabilitySummary(): Promise<StaffAvailabilitySummary> {
    const response = await fetch(`${API_BASE_URL}/supervisor/staff-availability-summary`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<StaffAvailabilitySummary>(response);
  }

  // ============================================
  // LIVE MONITORING
  // ============================================

  async getLiveMonitoring(): Promise<LiveMonitoring> {
    const response = await fetch(`${API_BASE_URL}/supervisor/live-monitoring`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<LiveMonitoring>(response);
  }

  // ============================================
  // VOICEMAILS & MISSED CALLS
  // ============================================

  async getVoicemails(limit: number = 10, offset: number = 0): Promise<VoicemailsResponse> {
    const response = await fetch(
      `${API_BASE_URL}/supervisor/voicemails?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<VoicemailsResponse>(response);
  }

  async getMissedCalls(limit: number = 10, offset: number = 0): Promise<MissedCallsResponse> {
    const response = await fetch(
      `${API_BASE_URL}/supervisor/missedcalls?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<MissedCallsResponse>(response);
  }

  // ============================================
  // CALL HISTORY
  // ============================================

  async getCallHistory(limit: number = 10, offset: number = 0): Promise<CallHistoryResponse> {
    const response = await fetch(
      `${API_BASE_URL}/supervisor/call-history?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<CallHistoryResponse>(response);
  }

  // ============================================
  // ANALYTICS
  // ============================================

  async getAnalyticsOverview(): Promise<AnalyticsOverview> {
    const response = await fetch(`${API_BASE_URL}/supervisor/analytics/overview`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<AnalyticsOverview>(response);
  }

  async getAnalyticsCallVolumeTrends(startDate?: string, endDate?: string): Promise<DetailedCallVolumeTrends> {
    let url = `${API_BASE_URL}/supervisor/analytics/call-volume-trends`;
    if (startDate && endDate) {
      url += `?start_date=${startDate}&end_date=${endDate}`;
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<DetailedCallVolumeTrends>(response);
  }

  async getCriticalAlertDistribution(): Promise<CriticalAlertDistribution> {
    const response = await fetch(`${API_BASE_URL}/supervisor/analytics/critical-alert-distribution`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<CriticalAlertDistribution>(response);
  }

  async getLeaderboard(limit: number = 5): Promise<Leaderboard> {
    const response = await fetch(
      `${API_BASE_URL}/supervisor/analytics/leaderboard?limit=${limit}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<Leaderboard>(response);
  }

  async getCallerSentimentTrends(): Promise<CallerSentimentTrends> {
    const response = await fetch(`${API_BASE_URL}/supervisor/analytics/caller-sentiment-trends`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<CallerSentimentTrends>(response);
  }

  async getGenderBreakdown(): Promise<GenderBreakdown> {
    const response = await fetch(`${API_BASE_URL}/supervisor/analytics/gender-breakdown`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<GenderBreakdown>(response);
  }

  async getLanguageUsage(): Promise<LanguageUsage> {
    const response = await fetch(`${API_BASE_URL}/supervisor/analytics/language-usage`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<LanguageUsage>(response);
  }

  async getCallerTypeBreakdown(): Promise<CallerTypeBreakdown> {
    const response = await fetch(`${API_BASE_URL}/supervisor/analytics/caller-type-breakdown`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<CallerTypeBreakdown>(response);
  }

  async getTrajectoryOfCare(): Promise<TrajectoryOfCare> {
    const response = await fetch(`${API_BASE_URL}/supervisor/analytics/trajectory-of-care`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<TrajectoryOfCare>(response);
  }

  async getTopicBreakdown(): Promise<TopicBreakdown> {
    const response = await fetch(`${API_BASE_URL}/supervisor/analytics/topic-breakdown`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<TopicBreakdown>(response);
  }

  async getCallOutcomes(): Promise<CallOutcomes> {
    const response = await fetch(`${API_BASE_URL}/supervisor/analytics/call-outcomes`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<CallOutcomes>(response);
  }

  async getTopicTrends(): Promise<TopicTrends> {
    const response = await fetch(`${API_BASE_URL}/supervisor/analytics/topic-trends`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<TopicTrends>(response);
  }

  async getQualityOverview(): Promise<QualityOverview> {
    const response = await fetch(`${API_BASE_URL}/supervisor/analytics/quality-overview`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<QualityOverview>(response);
  }

  async getConversationQualityTrends(): Promise<ConversationQualityTrends> {
    const response = await fetch(`${API_BASE_URL}/supervisor/analytics/conversation-quality-trends`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<ConversationQualityTrends>(response);
  }

  async getDialogueAnalysis(): Promise<DialogueAnalysis> {
    const response = await fetch(`${API_BASE_URL}/supervisor/analytics/dialogue-analysis`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<DialogueAnalysis>(response);
  }

  async getAgentConversationQuality(): Promise<AgentConversationQuality> {
    const response = await fetch(`${API_BASE_URL}/supervisor/analytics/agent-conversation-quality`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<AgentConversationQuality>(response);
  }

  async getAreasForImprovement(page: number = 1, pageSize: number = 10): Promise<AreasForImprovement> {
    const response = await fetch(
      `${API_BASE_URL}/supervisor/analytics/areas-for-improvement?page=${page}&page_size=${pageSize}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<AreasForImprovement>(response);
  }

  async getNetworkAudioQualityTrends(): Promise<NetworkAudioQualityTrends> {
    const response = await fetch(`${API_BASE_URL}/supervisor/analytics/network-audio-quality-trends`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<NetworkAudioQualityTrends>(response);
  }
}

export const supervisorApi = new SupervisorApi();
export default supervisorApi;