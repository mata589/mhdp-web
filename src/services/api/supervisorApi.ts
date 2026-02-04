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
  CallHistoryParams,
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
  ConversationQualityTrendsData,
  ConversationQualityInsights,
  StaffPerformanceOverview,
  StaffDetailsBasic,
  CallRecord,
  SpeakerSegment,
  Transcript,
  DetectedKeyword,
  TopicDiscussed,
  ConversationQuality,
  Outcome,
} from "../../types/supervisor.types";
//import type { EscalationDetails } from "../../types/user.types";
import type { EscalationDetails } from "../../types/supervisor.types";   // ← same folder, or correct relative path

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
    limit: number = 10,
    filters?: {
      resolution_status?: string;
      priority_level?: string;
      start_date?: string;
      end_date?: string;
    }
  ): Promise<EscalationsOverview> {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (filters?.resolution_status) {
      params.append("resolution_status", filters.resolution_status);
    }

    if (filters?.priority_level) {
      params.append("priority_level", filters.priority_level);
    }

    if (filters?.start_date) {
      params.append("start_date", filters.start_date);
    }

    if (filters?.end_date) {
      params.append("end_date", filters.end_date);
    }

    const url = `${API_BASE_URL}/supervisor/escalations-overview?${params.toString()}`;
    this.logRequest("GET", url, { page, limit, ...filters });

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

  async getLiveMonitoring(filters?: {
    agent_name?: string;
    risk_level?: string;
    status_filter?: string;
    page?: number;
    limit?: number;
  }): Promise<LiveMonitoring> {
    const params = new URLSearchParams();

    if (filters?.agent_name) params.append("agent_name", filters.agent_name);
    if (filters?.risk_level) params.append("risk_level", filters.risk_level);
    if (filters?.status_filter)
      params.append("status_filter", filters.status_filter);
    if (filters?.page) params.append("page", filters.page.toString());
    if (filters?.limit) params.append("limit", filters.limit.toString());

    const url = `${API_BASE_URL}/supervisor/live-monitoring?${params.toString()}`;
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
    options: {
      search?: string;
      start_date?: string; // ISO string
      end_date?: string;   // ISO string
      status_filter?: string;
      risk_level?: string;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<VoicemailsResponse> {
    const params = new URLSearchParams({
      limit: String(options.limit ?? 10),
      offset: String(options.offset ?? 0),
    });
  
    if (options.search) params.append("search", options.search);
    if (options.start_date) params.append("start_date", options.start_date);
    if (options.end_date) params.append("end_date", options.end_date);
    if (options.status_filter) params.append("status_filter", options.status_filter);
    if (options.risk_level) params.append("risk_level", options.risk_level);
  
    const url = `${API_BASE_URL}/supervisor/voicemails?${params.toString()}`;
    this.logRequest("GET", url, options);
  
    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });
  
    return this.handleResponse(response);
  }
  
  async getMissedCalls(
    options: {
      search?: string;
      start_date?: string; // ISO string
      end_date?: string;   // ISO string
      status_filter?: string;
      risk_level?: string;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<MissedCallsResponse> {
    const params = new URLSearchParams({
      limit: String(options.limit ?? 10),
      offset: String(options.offset ?? 0),
    });
  
    if (options.search) params.append("search", options.search);
    if (options.start_date) params.append("start_date", options.start_date);
    if (options.end_date) params.append("end_date", options.end_date);
    if (options.status_filter) params.append("status_filter", options.status_filter);
    if (options.risk_level) params.append("risk_level", options.risk_level);
  
    const url = `${API_BASE_URL}/supervisor/missedcalls?${params.toString()}`;
    this.logRequest("GET", url, options);
  
    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });
  
    return this.handleResponse(response);
  }
  

  // ============================================
  // CALL HISTORY
  // ============================================
   async getCallHistory(params?: CallHistoryParams): Promise<CallHistoryResponse>{
    const queryParams=new URLSearchParams({
      limit:String(params?.limit ?? 10),
      offset: String(params?.offset ?? 0)
    })
    const url =`${API_BASE_URL}/supervisor/call-history?${queryParams}`;
    this.logRequest("GET",url,params);

    const response = await fetch(url,{
      method : 'GET',
      headers:this.getAuthHeaders(),
    });
    return this.handleResponse(response);

   }
  
  // ============================================
  // ANALYTICS - OVERVIEW & TRENDS
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

  async getCallerSentimentTrends(
    startDate?: string,
    endDate?: string
  ): Promise<CallerSentimentTrends> {
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);

    const url = `${API_BASE_URL}/supervisor/analytics/caller-sentiment-trends?${params}`;
    this.logRequest("GET", url, { startDate, endDate });

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // ============================================
  // ANALYTICS - DEMOGRAPHICS
  // ============================================

  async getGenderBreakdown(): Promise<GenderBreakdown> {
    const url = `${API_BASE_URL}/supervisor/analytics/gender-breakdown`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getLanguageUsage(): Promise<LanguageUsage> {
    const url = `${API_BASE_URL}/supervisor/analytics/language-usage`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getCallerTypeBreakdown(): Promise<CallerTypeBreakdown> {
    const url = `${API_BASE_URL}/supervisor/analytics/caller-type-breakdown`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getTrajectoryOfCare(): Promise<TrajectoryOfCare> {
    const url = `${API_BASE_URL}/supervisor/analytics/trajectory-of-care`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // ============================================
  // ANALYTICS - TOPICS
  // ============================================

  async getTopicBreakdown(): Promise<TopicBreakdown> {
    const url = `${API_BASE_URL}/supervisor/analytics/topic-breakdown`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getCallOutcomes(): Promise<CallOutcomes> {
    const url = `${API_BASE_URL}/supervisor/analytics/call-outcomes`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getTopicTrends(year?: number): Promise<TopicTrends> {
    const params = new URLSearchParams();
    if (year) params.append("year", String(year));

    const url = `${API_BASE_URL}/supervisor/analytics/topic-trends?${params}`;
    this.logRequest("GET", url, { year });

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  // ============================================
  // ANALYTICS - QUALITY
  // ============================================

  async getQualityOverview(): Promise<QualityOverview> {
    const url = `${API_BASE_URL}/supervisor/analytics/quality-overview`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getConversationQualityTrends(
    startDate?: string,
    endDate?: string
  ): Promise<ConversationQualityTrends> {
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);

    const url = `${API_BASE_URL}/supervisor/analytics/conversation-quality-trends?${params}`;
    this.logRequest("GET", url, { startDate, endDate });

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getDialogueAnalysis(): Promise<DialogueAnalysis> {
    const url = `${API_BASE_URL}/supervisor/analytics/dialogue-analysis`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getAgentConversationQuality(
    startDate?: string,
    endDate?: string
  ): Promise<AgentConversationQuality> {
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);

    const url = `${API_BASE_URL}/supervisor/analytics/agent-conversation-quality?${params}`;
    this.logRequest("GET", url, { startDate, endDate });

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getAreasForImprovement(
    page: number = 1,
    pageSize: number = 10
  ): Promise<AreasForImprovement> {
    const params = new URLSearchParams({
      page: String(page),
      page_size: String(pageSize),
    });

    const url = `${API_BASE_URL}/supervisor/analytics/areas-for-improvement?${params}`;
    this.logRequest("GET", url, { page, pageSize });

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }
  // Add these methods to your SupervisorApi class in supervisorApi.ts

  // ============================================
  // STAFF DETAILS
  // ============================================

  async getStaffDetailsBasic(userId: string): Promise<StaffDetailsBasic> {
    const url = `${API_BASE_URL}/supervisor/staff-details/${userId}`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getStaffPerformanceOverview(
    userId: string
  ): Promise<StaffPerformanceOverview> {
    const url = `${API_BASE_URL}/supervisor/staff-details/performance-overview/${userId}`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }

  async getStaffConversationQualityInsights(
    userId: string
  ): Promise<ConversationQualityInsights> {
    const url = `${API_BASE_URL}/supervisor/staff-details/conversation-quality-insights/${userId}`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }
  async getStaffCallHistory(
  userId: string,
  limit: number = 10,
  offset: number = 0
): Promise<CallHistoryResponse> {
  const response = await fetch(
    `${API_BASE_URL}/supervisor/staff-details/call-history/${userId}?limit=${limit}&offset=${offset}`,
    {
      headers: this.getAuthHeaders(),
    }
  );
  return this.handleResponse<CallHistoryResponse>(response);
}

  async getStaffConversationQualityTrends(
    userId: string
  ): Promise<ConversationQualityTrendsData> {
    const url = `${API_BASE_URL}/supervisor/staff-details/conversation-quality-trends/${userId}`;
    this.logRequest("GET", url);

    const response = await fetch(url, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse(response);
  }
  async getEscalationDetails(escalationId: string): Promise<EscalationDetails> {
  const url = `${API_BASE_URL}/supervisor/escalation_details/${escalationId}`;
  this.logRequest("GET", url);

  const response = await fetch(url, {
    method: "GET",
    headers: this.getAuthHeaders(),
  });

  return this.handleResponse(response);
}
async getCallDetails(callId: string): Promise<CallRecord> {
  const url = `${API_BASE_URL}/supervisor/call-details/${callId}`;
  this.logRequest("GET", url);

  const response = await fetch(url, {
    method: "GET",
    headers: this.getAuthHeaders(),
  });

  return this.handleResponse<CallRecord>(response);
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

  // ============================================
  // CALL RECORDING DOWNLOAD
  // ============================================

  async downloadCallRecording(escalationId: string): Promise<Blob> {
    const url = `${API_BASE_URL}/supervisor/download_call_recording/${escalationId}`;
    this.logRequest("GET", url);

    const token = localStorage.getItem("authToken");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    console.debug("[Supervisor API → DOWNLOAD RESPONSE]", {
      url: response.url,
      status: response.status,
      contentType: response.headers.get("content-type"),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error("[Supervisor API → DOWNLOAD ERROR]", error);
      throw new Error(error.detail || "Failed to download call recording");
    }

    return response.blob();
  }
}




export const supervisorApi = new SupervisorApi();
export default supervisorApi;