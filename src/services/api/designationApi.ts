// api/designationApi.ts
import type {
  Designation,
  CreateDesignationRequest,
  CreateDesignationResponse,
  UpdateDesignationRequest,
  ArchiveDesignationRequest,
} from "../../types/designation.types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class DesignationApi {
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
    const response = await fetch(`${API_BASE_URL}/designation/healthcheck`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<string>(response);
  }

  async getAllDesignations(limit: number = 10, offset: number = 0): Promise<Designation[]> {
    const response = await fetch(`${API_BASE_URL}/designation/?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Designation[]>(response);
  }

  async createDesignation(data: CreateDesignationRequest): Promise<CreateDesignationResponse> {
    const response = await fetch(`${API_BASE_URL}/designation/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<CreateDesignationResponse>(response);
  }

  async updateDesignation(data: UpdateDesignationRequest): Promise<Designation> {
    const response = await fetch(`${API_BASE_URL}/designation/`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Designation>(response);
  }

  async getDesignationNames(limit: number = 10, offset: number = 0): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/designation/names?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<string>(response);
  }

  async getDesignationById(id: number): Promise<Designation> {
    const response = await fetch(`${API_BASE_URL}/designation/${id}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Designation>(response);
  }

  async deleteDesignation(designationId: number): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/designation/${designationId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<string>(response);
  }

  async archiveDesignation(data: ArchiveDesignationRequest): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/designation/archive`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<string>(response);
  }
}

export const designationApi = new DesignationApi();
export default designationApi;