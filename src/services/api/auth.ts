// src/services/api/auth.ts - Updated with role mapping logic
import type { RegisterData, User } from "./userApi";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://staging-mhdp-backend.marconilab.org";

console.info("[AuthService] API_BASE_URL:", API_BASE_URL);



interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

interface ForgotPasswordResponse {
  message: string;
}

// ===================== ROLE MAPPING =====================
/**
 * Maps designation_name or role_names to our internal role structure
 */
function mapUserRole(user: User): string {
  // First, try to map from role_names array
  if (user.role_names && user.role_names.length > 0) {
    const roleName = user.role_names[0].toLowerCase();
    
    if (roleName.includes('agent') || roleName === 'call agent') {
      return 'agent';
    }
    if (roleName.includes('supervisor') || roleName === 'call supervisor') {
      return 'supervisor';
    }
    if (roleName.includes('admin')) {
      return 'admin';
    }
  }
  
  // Fallback to designation_name
  const designation = user.designation_name.toLowerCase();
  
  if (designation.includes('facility admin')) {
    return 'facility_admin';
  }
  if (designation.includes('system admin') || designation === 'admin') {
    return 'admin';
  }
  if (designation.includes('supervisor')) {
    return 'supervisor';
  }
  if (designation.includes('agent') || designation.includes('clinician')) {
    return 'agent';
  }
  
  // Default fallback
  console.warn('[AuthService] Could not determine role, defaulting to agent. User:', user);
  return 'agent';
}

// ===================== SERVICE =====================
class AuthService {
  private tokenKey = "authToken";
  private userKey = "auth_user";

  // ---------- Helpers ----------
  private getAuthHeaders(): HeadersInit {
    const token = this.getToken();
    console.debug("[AuthService] getAuthHeaders | token exists:", !!token);

    return {
      "Content-Type": "application/json",
      accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    console.debug("[AuthService] handleResponse | status:", response.status);

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: "Request failed",
      }));

      console.error("[AuthService] API Error:", error);
      throw new Error(
        error.detail || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    console.debug("[AuthService] handleResponse | success data:", data);
    return data;
  }

  // ---------- Auth ----------
  async login(email: string, password: string): Promise<User> {
    console.info("[AuthService] login | email:", email);

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

    // Map the user role
    const userWithRole: User = {
      ...data.user,
      role: mapUserRole(data.user)
    };

    console.info("[AuthService] login success | user:", userWithRole.email, "| role:", userWithRole.role);

    this.setToken(data.access_token);
    this.setUser(userWithRole);

    return userWithRole;
  }

  async checkToken(): Promise<boolean> {
    const token = this.getToken();
    console.debug("[AuthService] checkToken | token exists:", !!token);

    if (!token) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/check-token`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      console.debug(
        "[AuthService] checkToken | response ok:",
        response.ok
      );

      return response.ok;
    } catch (err) {
      console.error("[AuthService] checkToken | error:", err);
      return false;
    }
  }

  async register(data: RegisterData): Promise<User> {
    console.info("[AuthService] register | email:", data.email);

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

    // Map the user role
    const userWithRole: User = {
      ...result.user,
      role: mapUserRole(result.user)
    };

    console.info("[AuthService] register success | user:", userWithRole.email, "| role:", userWithRole.role);

    this.setToken(result.access_token);
    this.setUser(userWithRole);

    return userWithRole;
  }

  async verifyOTP(email: string, otp: string): Promise<boolean> {
    console.info("[AuthService] verifyOTP | email:", email);

    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await this.handleResponse<{ success: boolean }>(response);

    console.debug("[AuthService] verifyOTP | success:", data.success);
    return data.success === true;
  }

  // ---------- Password ----------
  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    console.info("[AuthService] forgotPassword | email:", email);

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
    console.info("[AuthService] changePassword | token provided:", !!token);

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
    console.info("[AuthService] resetPassword");

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
    console.warn("[AuthService] logout");
    this.clearToken();
    this.clearUser();
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getCurrentUser();

    const authenticated = !!token && !!user && !this.isTokenExpired(token);
    console.debug("[AuthService] isAuthenticated:", authenticated);

    return authenticated;
  }

  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem(this.userKey);
      const user = userStr ? JSON.parse(userStr) : null;
      
      // If user exists but doesn't have a role field, compute it
      if (user && !user.role) {
        user.role = mapUserRole(user);
      }
      
      console.debug("[AuthService] getCurrentUser:", user);
      return user;
    } catch (err) {
      console.error("[AuthService] getCurrentUser | parse error:", err);
      return null;
    }
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    console.debug("[AuthService] getToken | exists:", !!token);
    return token;
  }

  // ---------- Storage ----------
  private setToken(token: string): void {
    console.debug("[AuthService] setToken");
    localStorage.setItem(this.tokenKey, token);
  }

  private clearToken(): void {
    console.debug("[AuthService] clearToken");
    localStorage.removeItem(this.tokenKey);
  }

  private setUser(user: User): void {
    console.debug("[AuthService] setUser:", user.email, "| role:", user.role);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private clearUser(): void {
    console.debug("[AuthService] clearUser");
    localStorage.removeItem(this.userKey);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expired = payload.exp * 1000 < Date.now();
      console.debug("[AuthService] isTokenExpired:", expired);
      return expired;
    } catch (err) {
      console.error("[AuthService] isTokenExpired | error:", err);
      return true;
    }
  }
}

// ===================== EXPORT =====================
export const authService = new AuthService();
export { AuthService };