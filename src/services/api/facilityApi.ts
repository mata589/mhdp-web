// api/facilityApi.ts
import type {
    Facility,
    CreateFacilityRequest,
    CreateFacilityResponse,
    UpdateFacilityRequest,
    ArchiveFacilityRequest,
  } from  "../../types/facility.types";



  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  class FacilityApi {
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
  
    async healthCheck(): Promise<string> {
      const response = await fetch(`${API_BASE_URL}/facilities/healthcheck`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<string>(response);
    }
  
    async getAllFacilities(): Promise<Facility[]> {
      const response = await fetch(`${API_BASE_URL}/facilities/`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<Facility[]>(response);
    }
  
    async createFacility(data: CreateFacilityRequest): Promise<CreateFacilityResponse> {
      const response = await fetch(`${API_BASE_URL}/facilities/`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });
      return this.handleResponse<CreateFacilityResponse>(response);
    }
  
    async updateFacility(data: UpdateFacilityRequest): Promise<Facility> {
      const response = await fetch(`${API_BASE_URL}/facilities/`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });
      return this.handleResponse<Facility>(response);
    }
  
    async getFacilityById(facilityId: string): Promise<Facility> {
      const response = await fetch(`${API_BASE_URL}/facilities/facility_id/${facilityId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<Facility>(response);
    }
  
    async getFacilityByName(facilityName: string): Promise<Facility> {
      const response = await fetch(`${API_BASE_URL}/facilities/facility_name/${facilityName}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<Facility>(response);
    }
  
    async deleteFacility(facilityId: string): Promise<string> {
      const response = await fetch(`${API_BASE_URL}/facilities/${facilityId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      return this.handleResponse<string>(response);
    }
  
    async archiveFacility(data: ArchiveFacilityRequest): Promise<string> {
      const response = await fetch(`${API_BASE_URL}/facilities/archive`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });
      return this.handleResponse<string>(response);
    }
  }
  
  export const facilityApi = new FacilityApi();
  export default facilityApi;