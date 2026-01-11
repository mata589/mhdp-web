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

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://staging-mhdp-backend.marconilab.org";

class SupervisorApi {
  // ============================================
  // HELPERS
  // ============================================

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("authToken");
    return {
      "Content-Type": "application/json",
      accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private logRequest(method: string, url: string, params?: unknown) {
    console.debug("[Supervisor API → REQUEST]", {
      method,
      url,
      params,
    });
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    console.debug("[Supervisor API → RESPONSE]", {
      url: response.url,
      status: response.status,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error("[Supervisor API → ERROR]", error);
      throw new Error(error.detail || "API request failed");
    }

    return response.json();
  }

  // ============================================
  // OVERVIEW & DASHBOARD
  // ============================================

  async getOverview(): Promise<SupervisorOverview> {
    const url = `${API_BASE_URL}/supervisor/overview`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getCallVolumeTrends(): Promise<CallVolumeTrends> {
    const url = `${API_BASE_URL}/supervisor/call-volume-trends`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getAgentStatusMonitor(): Promise<AgentStatusMonitor> {
    const url = `${API_BASE_URL}/supervisor/agent-status-monitor`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // ============================================
  // ESCALATIONS
  // ============================================

  async getEscalationsOverview(
    page: number = 1,
    limit: number = 10
  ): Promise<EscalationsOverview> {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    const url = `${API_BASE_URL}/supervisor/escalations-overview?${params}`;
    this.logRequest("GET", url, { page, limit });

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async updateEscalation(
    data: UpdateEscalationRequest
  ): Promise<UpdateEscalationResponse> {
    const url = `${API_BASE_URL}/supervisor/update-escalation`;
    this.logRequest("PUT", url, data);

    const response = await fetch(url, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse(response);
  }

  async getEscalationsSummary(): Promise<EscalationsSummary> {
    const url = `${API_BASE_URL}/supervisor/escalations_summary`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async listEscalatedCalls(
    limit: number = 10,
    offset: number = 0
  ): Promise<EscalatedCallsResponse> {
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
    });

    const url = `${API_BASE_URL}/supervisor/list_escalated_calls?${params}`;
    this.logRequest("GET", url, { limit, offset });

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // ============================================
  // STAFF MANAGEMENT
  // ============================================

  async getStaffPerformance(
    page: number = 1,
    limit: number = 10
  ): Promise<StaffPerformance> {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    const url = `${API_BASE_URL}/supervisor/staff-performance?${params}`;
    this.logRequest("GET", url, { page, limit });

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getStaffAvailabilitySummary(): Promise<StaffAvailabilitySummary> {
    const url = `${API_BASE_URL}/supervisor/staff-availability-summary`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // ============================================
  // LIVE MONITORING
  // ============================================

  async getLiveMonitoring(): Promise<LiveMonitoring> {
    const url = `${API_BASE_URL}/supervisor/live-monitoring`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // ============================================
  // VOICEMAILS & MISSED CALLS
  // ============================================

  async getVoicemails(
    limit: number = 10,
    offset: number = 0
  ): Promise<VoicemailsResponse> {
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
    });

    const url = `${API_BASE_URL}/supervisor/voicemails?${params}`;
    this.logRequest("GET", url, { limit, offset });

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getMissedCalls(
    limit: number = 10,
    offset: number = 0
  ): Promise<MissedCallsResponse> {
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
    });

    const url = `${API_BASE_URL}/supervisor/missedcalls?${params}`;
    this.logRequest("GET", url, { limit, offset });

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // ============================================
  // CALL HISTORY
  // ============================================

  async getCallHistory(
    limit: number = 10,
    offset: number = 0
  ): Promise<CallHistoryResponse> {
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
    });

    const url = `${API_BASE_URL}/supervisor/call-history?${params}`;
    this.logRequest("GET", url, { limit, offset });

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // ============================================
  // ANALYTICS (pattern identical to Agent API)
  // ============================================

  async getAnalyticsOverview(): Promise<AnalyticsOverview> {
    const url = `${API_BASE_URL}/supervisor/analytics/overview`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getAnalyticsCallVolumeTrends(
    startDate?: string,
    endDate?: string
  ): Promise<DetailedCallVolumeTrends> {
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);

    const url = `${API_BASE_URL}/supervisor/analytics/call-volume-trends?${params}`;
    this.logRequest("GET", url, { startDate, endDate });

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getCriticalAlertDistribution(): Promise<CriticalAlertDistribution> {
    const url = `${API_BASE_URL}/supervisor/analytics/critical-alert-distribution`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getLeaderboard(limit: number = 5): Promise<Leaderboard> {
    const params = new URLSearchParams({ limit: String(limit) });
    const url = `${API_BASE_URL}/supervisor/analytics/leaderboard?${params}`;
    this.logRequest("GET", url, { limit });

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getNetworkAudioQualityTrends(): Promise<NetworkAudioQualityTrends> {
    const url = `${API_BASE_URL}/supervisor/analytics/network-audio-quality-trends`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }
}

export const supervisorApi = new SupervisorApi();
export default supervisorApi;
