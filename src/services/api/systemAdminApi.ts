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
  Facility,
  FacilityAdmin,
  CreateFacilityRequest,
  UpdateFacilityRequest,
  CreateFacilityAdminRequest,
  UpdateFacilityAdminRequest,
} from "../../types/systemAdmin.types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://staging-mhdp-backend.marconilab.org';

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

  async getFullOverview(startDate: string, endDate: string): Promise<FullOverview> {
    const response = await fetch(
      `${API_BASE_URL}/system_admin/analytics/overview/full?start_date=${startDate}&end_date=${endDate}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<FullOverview>(response);
  }

  // ============================================
  // FACILITIES
  // ============================================

  async getFacilities(
    search?: string,
    status?: 'active' | 'inactive',
    limit: number = 20,
    offset: number = 0
  ): Promise<FacilitiesListResponse> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });
    
    if (search) params.append('search', search);
    if (status) params.append('status', status);

    const response = await fetch(
      `${API_BASE_URL}/system_admin/facilities?${params.toString()}`,
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

  async getFacility(facilityId: string): Promise<Facility> {
    const response = await fetch(
      `${API_BASE_URL}/system_admin/get_facility/${facilityId}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<Facility>(response);
  }

  async createFacility(data: CreateFacilityRequest): Promise<{ message: string; facility_id: string }> {
    const response = await fetch(`${API_BASE_URL}/system_admin/create_facility`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async updateFacility(data: UpdateFacilityRequest): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/system_admin/update_facility`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async archiveFacility(facilityId: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/system_admin/archive_facility`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ facility_id: facilityId }),
    });
    return this.handleResponse(response);
  }

  async deleteFacility(facilityId: string): Promise<{ message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/system_admin/delete_facility/${facilityId}`,
      {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse(response);
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

  async getUsersDistribution(startDate: string, endDate: string): Promise<UsersDistributionResponse> {
    const response = await fetch(
      `${API_BASE_URL}/system_admin/users/distribution?start_date=${startDate}&end_date=${endDate}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<UsersDistributionResponse>(response);
  }

  // ============================================
  // FACILITY ADMINS
  // ============================================

  async searchFacilityAdmins(
    searchQuery?: string,
    facilityId?: string,
    isActive?: boolean,
    limit: number = 10,
    offset: number = 0
  ): Promise<FacilityAdmin[]> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });
    
    if (searchQuery) params.append('search_query', searchQuery);
    if (facilityId) params.append('facility_id', facilityId);
    if (isActive !== undefined) params.append('is_active', isActive.toString());

    const response = await fetch(
      `${API_BASE_URL}/system_admin/users/facility_admin/search?${params.toString()}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse<FacilityAdmin[]>(response);
  }

  async createFacilityAdmin(data: CreateFacilityAdminRequest): Promise<{ message: string; user_id: string }> {
    const response = await fetch(`${API_BASE_URL}/system_admin/users/facility_admin`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async updateFacilityAdmin(data: UpdateFacilityAdminRequest): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/system_admin/users/facility_admin/edit`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async archiveFacilityAdmin(userId: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/system_admin/users/facility_admin/archive`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ user_id: userId }),
    });
    return this.handleResponse(response);
  }

  async deleteFacilityAdmin(userId: string): Promise<{ message: string }> {
    const response = await fetch(
      `${API_BASE_URL}/system_admin/users/facility_admin/${userId}`,
      {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      }
    );
    return this.handleResponse(response);
  }

  // ============================================
  // CALLS / ANALYTICS
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