// api/systemAdminApi.ts
import type {
  SystemAdminOverview,
  FacilitiesOverview,
  UsersOverview,
  FullOverview,
  FacilitiesListResponse,
  FacilitiesPerformanceResponse,
  HourlyCallTrendsResponse,
  UsersDistributionResponse,
} from "../../types/systemAdmin.types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class SystemAdminApi {
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
  // OVERVIEW
  // ============================================

  async getOverview(): Promise<SystemAdminOverview> {
    const response = await fetch(`${API_BASE_URL}/system_admin/overview`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<SystemAdminOverview>(response);
  }

  async getFullOverview(): Promise<FullOverview> {
    const response = await fetch(`${API_BASE_URL}/system_admin/overview/full`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<FullOverview>(response);
  }

  // ============================================
  // FACILITIES
  // ============================================

  async getFacilities(limit: number = 20, offset: number = 0): Promise<FacilitiesListResponse> {
    const response = await fetch(
      `${API_BASE_URL}/system_admin/facilities?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<FacilitiesListResponse>(response);
  }

  async getFacilitiesOverview(): Promise<FacilitiesOverview> {
    const response = await fetch(`${API_BASE_URL}/system_admin/facilities/overview`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<FacilitiesOverview>(response);
  }

  async getFacilitiesPerformance(startDate: string, endDate: string): Promise<FacilitiesPerformanceResponse> {
    const response = await fetch(
      `${API_BASE_URL}/system_admin/facilities/performance?start_date=${startDate}&end_date=${endDate}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<FacilitiesPerformanceResponse>(response);
  }

  // ============================================
  // USERS
  // ============================================

  async getUsersOverview(): Promise<UsersOverview> {
    const response = await fetch(`${API_BASE_URL}/system_admin/users/overview`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<UsersOverview>(response);
  }

  async getUsersDistribution(): Promise<UsersDistributionResponse> {
    const response = await fetch(`${API_BASE_URL}/system_admin/users/distribution`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<UsersDistributionResponse>(response);
  }

  // ============================================
  // CALLS
  // ============================================

  async getCallsHourlyTrends(startDate: string, endDate: string): Promise<HourlyCallTrendsResponse> {
    const response = await fetch(
      `${API_BASE_URL}/system_admin/calls/hourly-trends?start_date=${startDate}&end_date=${endDate}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<HourlyCallTrendsResponse>(response);
  }
}

export const systemAdminApi = new SystemAdminApi();
export default systemAdminApi;