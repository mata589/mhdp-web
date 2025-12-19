//api/agentApi.ts
import type {
    AgentOverview,
    RecentCallActivityResponse,
    AgentAvailabilityResponse,
    UpdateAvailabilityRequest,
    VoicemailsResponse,
    MissedCallsResponse,
    CallHistoryResponse,
    CallDetailsResponse,
    SupervisorListResponse,
    EscalateCallRequest,
    EscalateCallResponse,
    EscalationsSummary,
    EscalatedCallsResponse,
    EscalationDetailsResponse,
    AgentAnalyticsOverview,
    AgentCallVolumeTrends,
    AgentLeaderboard,
    AgentConversationQualityTrends,
    AgentConversationQualityInsights,
  } from "../../types/agent.types";

//import type { AgentOverview } from "../../types/agent.types";

  
  //const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://staging-mhdp-backend.marconilab.org';
  
  class AgentApi {
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
  
    async getOverview(): Promise<AgentOverview> {
      const response = await fetch(`${API_BASE_URL}/agent/overview`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<AgentOverview>(response);
    }
  
    // ============================================
    // CALL ACTIVITY
    // ============================================
  
    async getRecentCallActivity(
      limit: number = 10,
      offset: number = 0,
      riskLevel?: 'low' | 'medium' | 'high',
      callStatus?: 'answered' | 'not_answered' | 'voicemail'
    ): Promise<RecentCallActivityResponse> {
      let url = `${API_BASE_URL}/agent/recent_call_activity?limit=${limit}&offset=${offset}`;
      if (riskLevel) url += `&risk_level=${riskLevel}`;
      if (callStatus) url += `&call_status=${callStatus}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<RecentCallActivityResponse>(response);
    }
  
    // ============================================
    // AVAILABILITY
    // ============================================
  
    async getAvailability(): Promise<AgentAvailabilityResponse> {
      const response = await fetch(`${API_BASE_URL}/agent/availability`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<AgentAvailabilityResponse>(response);
    }
  
    async updateAvailability(status: 'available' | 'busy' | 'away'): Promise<AgentAvailabilityResponse> {
      const response = await fetch(`${API_BASE_URL}/agent/availability?status=${status}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<AgentAvailabilityResponse>(response);
    }
  
    // ============================================
    // VOICEMAILS & MISSED CALLS
    // ============================================
  
    async getVoicemails(
      limit: number = 10,
      offset: number = 0,
      statusFilter?: 'resolved' | 'unresolved',
      riskLevel?: 'low' | 'medium' | 'high'
    ): Promise<VoicemailsResponse> {
      let url = `${API_BASE_URL}/agent/voicemails?limit=${limit}&offset=${offset}`;
      if (statusFilter) url += `&status_filter=${statusFilter}`;
      if (riskLevel) url += `&risk_level=${riskLevel}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<VoicemailsResponse>(response);
    }
  
    async getMissedCalls(
      limit: number = 10,
      offset: number = 0,
      search?: string,
      statusFilter?: 'missed' | 'returned',
      riskLevel?: 'low' | 'medium' | 'high'
    ): Promise<MissedCallsResponse> {
      let url = `${API_BASE_URL}/agent/missedcalls?limit=${limit}&offset=${offset}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (statusFilter) url += `&status_filter=${statusFilter}`;
      if (riskLevel) url += `&risk_level=${riskLevel}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<MissedCallsResponse>(response);
    }
  
    // ============================================
    // CALL HISTORY & DETAILS
    // ============================================
  
    async getCallHistory(
      limit: number = 10,
      offset: number = 0,
      search?: string,
      riskLevel?: 'low' | 'medium' | 'high',
      outcome?: 'resolved' | 'unresolved' | 'escalated'
    ): Promise<CallHistoryResponse> {
      let url = `${API_BASE_URL}/agent/call-history?limit=${limit}&offset=${offset}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (riskLevel) url += `&risk_level=${riskLevel}`;
      if (outcome) url += `&outcome=${outcome}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<CallHistoryResponse>(response);
    }
  
    async getCallDetails(callId: string): Promise<CallDetailsResponse> {
      const response = await fetch(`${API_BASE_URL}/agent/call-details/${callId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<CallDetailsResponse>(response);
    }
  
    // ============================================
    // CALL RECORDINGS
    // ============================================
  
    async playCallRecording(callId: string): Promise<Blob> {
      const response = await fetch(`${API_BASE_URL}/agent/play_call_recording/${callId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch call recording');
      }
      return response.blob();
    }
  
    async downloadCallRecording(callId: string): Promise<Blob> {
      const response = await fetch(`${API_BASE_URL}/agent/download_call_recording/${callId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to download call recording');
      }
      return response.blob();
    }
  
    // ============================================
    // SUPERVISORS & ESCALATIONS
    // ============================================
  
    async getSupervisors(limit: number = 10, offset: number = 0): Promise<SupervisorListResponse> {
      const response = await fetch(
        `${API_BASE_URL}/agent/supervisors?limit=${limit}&offset=${offset}`,
        {
          method: 'GET',
          headers: this.getAuthHeaders(),
        }
      );
      return this.handleResponse<SupervisorListResponse>(response);
    }
  
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
  
    async listEscalatedCalls(
      limit: number = 10,
      offset: number = 0,
      search?: string,
      riskLevel?: 'low' | 'medium' | 'high',
      priorityLevel?: 'low' | 'medium' | 'high',
      resolutionStatus?: 'pending' | 'in_progress' | 'resolved'
    ): Promise<EscalatedCallsResponse> {
      let url = `${API_BASE_URL}/agent/list_escalated_calls?limit=${limit}&offset=${offset}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (riskLevel) url += `&risk_level=${riskLevel}`;
      if (priorityLevel) url += `&priority_level=${priorityLevel}`;
      if (resolutionStatus) url += `&resolution_status=${resolutionStatus}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<EscalatedCallsResponse>(response);
    }
  
    async getEscalationDetails(escalationId: number): Promise<EscalationDetailsResponse> {
      const response = await fetch(`${API_BASE_URL}/agent/escalation_details/${escalationId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<EscalationDetailsResponse>(response);
    }
  
    // ============================================
    // ANALYTICS
    // ============================================
  
    async getAnalyticsOverview(): Promise<AgentAnalyticsOverview> {
      const response = await fetch(`${API_BASE_URL}/agent/analytics/overview`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<AgentAnalyticsOverview>(response);
    }
  
    async getAnalyticsCallVolumeTrends(): Promise<AgentCallVolumeTrends> {
      const response = await fetch(`${API_BASE_URL}/agent/analytics/call-volume-trends`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<AgentCallVolumeTrends>(response);
    }
  
    async getAnalyticsLeaderboard(limit: number = 5): Promise<AgentLeaderboard> {
      const response = await fetch(
        `${API_BASE_URL}/agent/analytics/leaderboard?limit=${limit}`,
        {
          method: 'GET',
          headers: this.getAuthHeaders(),
        }
      );
      return this.handleResponse<AgentLeaderboard>(response);
    }
  
    async getConversationQualityTrends(): Promise<AgentConversationQualityTrends> {
      const response = await fetch(`${API_BASE_URL}/agent/analytics/conversation-quality-trends`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<AgentConversationQualityTrends>(response);
    }
  
    async getConversationQualityInsights(): Promise<AgentConversationQualityInsights> {
      const response = await fetch(`${API_BASE_URL}/agent/analytics/conversation-quality-insights`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<AgentConversationQualityInsights>(response);
    }
  }
  
  export const agentApi = new AgentApi();
  export default agentApi;