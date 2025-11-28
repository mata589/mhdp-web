// api/userApi.ts
import type {
  UserOverview,
  RecentCallActivityResponse,
  UserAvailability,
  UserStatus,
  VoicemailsResponse,
  MissedCallsResponse,
  CallHistoryResponse,
  EscalateCallRequest,
  EscalateCallResponse,
  EscalationsSummary,
  EscalationsListResponse,
  EscalationDetails,
  AnalyticsOverview,
  CallVolumeTrends,
  Leaderboard,
  ConversationQualityTrends,
  ConversationQualityInsights,
} from "../../types/user.types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class UserApi {
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

  async getOverview(): Promise<UserOverview> {
    const response = await fetch(`${API_BASE_URL}/agent/overview`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<UserOverview>(response);
  }

  // ============================================
  // CALL ACTIVITY
  // ============================================

  async getRecentCallActivity(limit: number = 10, offset: number = 0): Promise<RecentCallActivityResponse> {
    const response = await fetch(
      `${API_BASE_URL}/agent/recent_call_activity?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<RecentCallActivityResponse>(response);
  }

  // ============================================
  // AVAILABILITY
  // ============================================

  async updateAvailability(status: UserStatus): Promise<UserAvailability> {
    const response = await fetch(`${API_BASE_URL}/agent/availability?status=${status}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<UserAvailability>(response);
  }

  async getAvailability(): Promise<UserAvailability> {
    const response = await fetch(`${API_BASE_URL}/agent/availability`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<UserAvailability>(response);
  }

  // ============================================
  // VOICEMAILS
  // ============================================

  async getVoicemails(limit: number = 10, offset: number = 0): Promise<VoicemailsResponse> {
    const response = await fetch(
      `${API_BASE_URL}/agent/voicemails?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<VoicemailsResponse>(response);
  }

  // ============================================
  // MISSED CALLS
  // ============================================

  async getMissedCalls(limit: number = 10, offset: number = 0): Promise<MissedCallsResponse> {
    const response = await fetch(
      `${API_BASE_URL}/agent/missedcalls?limit=${limit}&offset=${offset}`,
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
      `${API_BASE_URL}/agent/call-history?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<CallHistoryResponse>(response);
  }

  // ============================================
  // ESCALATIONS
  // ============================================

  async escalateCall(data: EscalateCallRequest): Promise<EscalateCallResponse> {
    const response = await fetch(`${API_BASE_URL}/agent/escalate-call`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<EscalateCallResponse>(response);
  }

  async getEscalationsSummary(): Promise<EscalationsSummary> {
    const response = await fetch(`${API_BASE_URL}/agent/escalations_summary`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<EscalationsSummary>(response);
  }

  async getEscalationsList(limit: number = 10, offset: number = 0): Promise<EscalationsListResponse> {
    const response = await fetch(
      `${API_BASE_URL}/agent/list?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<EscalationsListResponse>(response);
  }

  async getEscalationDetails(escalationId: string): Promise<EscalationDetails> {
    const response = await fetch(
      `${API_BASE_URL}/agent/escalation_details/${escalationId}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<EscalationDetails>(response);
  }

  // ============================================
  // ANALYTICS
  // ============================================

  async getAnalyticsOverview(): Promise<AnalyticsOverview> {
    const response = await fetch(`${API_BASE_URL}/agent/analytics/overview`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<AnalyticsOverview>(response);
  }

  async getCallVolumeTrends(): Promise<CallVolumeTrends> {
    const response = await fetch(`${API_BASE_URL}/agent/analytics/call-volume-trends`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<CallVolumeTrends>(response);
  }

  async getLeaderboard(limit: number = 5): Promise<Leaderboard> {
    const response = await fetch(
      `${API_BASE_URL}/agent/analytics/leaderboard?limit=${limit}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<Leaderboard>(response);
  }

  async getConversationQualityTrends(): Promise<ConversationQualityTrends> {
    const response = await fetch(
      `${API_BASE_URL}/agent/analytics/conversation-quality-trends`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<ConversationQualityTrends>(response);
  }

  async getConversationQualityInsights(): Promise<ConversationQualityInsights> {
    const response = await fetch(
      `${API_BASE_URL}/agent/analytics/conversation-quality-insights`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<ConversationQualityInsights>(response);
  }
}

export const userApi = new UserApi();
export default userApi;