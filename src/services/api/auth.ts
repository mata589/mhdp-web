// src/services/api/auth.ts
import type { RegisterData } from "./userApi";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://staging-mhdp-backend.marconilab.org";

// ===================== TYPES =====================
export interface User {
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  designation_name: string;
  role_names: string[];
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

interface ForgotPasswordResponse {
  message: string;
}

// ===================== SERVICE =====================
class AuthService {
  private tokenKey = "authToken";
  private userKey = "auth_user";

  // ---------- Helpers ----------
  private getAuthHeaders(): HeadersInit {
    const token = this.getToken();
    return {
      "Content-Type": "application/json",
      accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: "Request failed",
      }));
      throw new Error(
        error.detail || `HTTP ${response.status}: ${response.statusText}`
      );
    }
    return response.json();
  }

  // ---------- Auth ----------
  async login(email: string, password: string): Promise<User> {
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("email", email);
    formData.append("password", password);
    formData.append("scope", "");
    formData.append("client_id", "");
    formData.append("client_secret", "");

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const data = await this.handleResponse<LoginResponse>(response);
    this.setToken(data.access_token);
    this.setUser(data.user);
    return data.user;
  }

  async checkToken(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/check-token`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  async register(data: RegisterData): Promise<User> {
    const { email, password, firstName, lastName, role } = data;

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        role,
      }),
    });

    const result = await this.handleResponse<LoginResponse>(response);
    this.setToken(result.access_token);
    this.setUser(result.user);
    return result.user;
  }

  async verifyOTP(email: string, otp: string): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await this.handleResponse<{ success: boolean }>(response);
    return data.success === true;
  }

  // ---------- Password ----------
  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    const response = await fetch(`${API_BASE_URL}/forgot_password`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    return this.handleResponse<ForgotPasswordResponse>(response);
  }

  async changePassword(
    token: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<string> {
    const response = await fetch(
      `${API_BASE_URL}/change_password?token=${token}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      }
    );

    return this.handleResponse<string>(response);
  }

  async resetPassword(
    newPassword: string,
    confirmPassword: string
  ): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/reset_password`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        new_password: newPassword,
        confirm_password: confirmPassword,
      }),
    });

    return this.handleResponse<string>(response);
  }

  // ---------- Session ----------
  logout(): void {
    this.clearToken();
    this.clearUser();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getCurrentUser();
    if (!token || !user) return false;
    return !this.isTokenExpired(token);
  }

  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem(this.userKey);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // ---------- Storage ----------
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private clearUser(): void {
    localStorage.removeItem(this.userKey);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }
}

// ===================== EXPORT =====================
export const authService = new AuthService();
export { AuthService };
