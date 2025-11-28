// api/roleApi.ts
import type {
  Role,
  CreateRoleRequest,
  CreateRoleResponse,
  UpdateRoleRequest,
  ArchiveRoleRequest,
} from "../../types/role.types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class RoleApi {
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
    const response = await fetch(`${API_BASE_URL}/role/healthcheck`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<string>(response);
  }

  async getAllRoles(limit: number = 10, offset: number = 0): Promise<Role[]> {
    const response = await fetch(`${API_BASE_URL}/role/?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Role[]>(response);
  }

  async createRole(data: CreateRoleRequest): Promise<CreateRoleResponse> {
    const response = await fetch(`${API_BASE_URL}/role/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<CreateRoleResponse>(response);
  }

  async updateRole(data: UpdateRoleRequest): Promise<Role> {
    const response = await fetch(`${API_BASE_URL}/role/`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Role>(response);
  }

  async getRoleNames(limit: number = 10, offset: number = 0): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/role/names?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<string>(response);
  }

  async getRoleById(id: number): Promise<Role> {
    const response = await fetch(`${API_BASE_URL}/role/${id}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Role>(response);
  }

  async deleteRole(roleId: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/role/${roleId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<string>(response);
  }

  async archiveRole(data: ArchiveRoleRequest): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/role/archive`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<string>(response);
  }
}

export const roleApi = new RoleApi();
export default roleApi;