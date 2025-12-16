// src/services/api/auth.ts
//import type { RegisterData } from '../../types/user.types';

import type { RegisterData } from "./userApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://staging-mhdp-backend.marconilab.org';

// Backend user structure
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

interface ChangePasswordRequest {
  new_password: string;
  confirm_password: string;
}

// Sample test users - fallback when API is unreachable
const MOCK_USERS: User[] = [
  {
    email: 'admin@callcenter.com',
    first_name: 'John',
    last_name: 'Admin',
    is_active: true,
    designation_name: 'Central General Hospital',
    role_names: ['admin'],
  },
  {
    email: 'supervisor@callcenter.com',
    first_name: 'Sarah',
    last_name: 'Supervisor',
    is_active: true,
    designation_name: 'St. Mary Medical Center',
    role_names: ['supervisor'],
  },
  {
    email: 'agent@callcenter.com',
    first_name: 'Mike',
    last_name: 'Agent',
    is_active: true,
    designation_name: 'Central General Hospital',
    role_names: ['agent'],
  },
];

const MOCK_CREDENTIALS = [
  { email: 'admin@callcenter.com', password: 'password123' },
  { email: 'supervisor@callcenter.com', password: 'password123' },
  { email: 'agent@callcenter.com', password: 'password123' },
];

class AuthService {
  private tokenKey = 'authToken';
  private userKey = 'auth_user';

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem(this.tokenKey);
    return {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Request failed' }));
      throw new Error(error.detail || `HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Login user with email and password
   */
  async login(email: string, password: string): Promise<User> {
    try {
      // Create form-encoded data as required by the API
      const formData = new URLSearchParams();
      formData.append('grant_type', 'password');
      formData.append('email', email);
      formData.append('password', password);
      formData.append('scope', '');
      formData.append('client_id', '');
      formData.append('client_secret', '');

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      const data = await this.handleResponse<LoginResponse>(response);
      
      // Store token and user
      this.setToken(data.access_token);
      this.setUser(data.user);
      
      return data.user;
    } catch (error) {
      console.warn('API login failed, falling back to mock data:', error);
      return this.mockLogin(email, password);
    }
  }

  /**
   * Check if current token is valid
   */
  async checkToken(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;

    // If it's a mock token, check mock validity
    if (this.isMockToken(token)) {
      return this.isAuthenticated();
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/check-token`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        const result = await response.json();
        return result === true || typeof result === 'string';
      }
      return false;
    } catch (error) {
      console.warn('Token check failed:', error);
      // Fallback to local token validation
      return this.isAuthenticated();
    }
  }

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/forgot_password`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      return this.handleResponse<ForgotPasswordResponse>(response);
    } catch (error) {
      console.warn('Forgot password API failed:', error);
      // Mock response
      await new Promise(resolve => setTimeout(resolve, 500));
      return { message: 'Password reset email sent (mock)' };
    }
  }

  /**
   * Change password with token (from email link)
   */
  async changePassword(token: string, newPassword: string, confirmPassword: string): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/change_password?token=${token}`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });

      return this.handleResponse<string>(response);
    } catch (error) {
      console.warn('Change password API failed:', error);
      throw new Error('Failed to change password');
    }
  }

  /**
   * Reset password (authenticated user)
   */
  async resetPassword(newPassword: string, confirmPassword: string): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/reset_password`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });

      return this.handleResponse<string>(response);
    } catch (error) {
      console.warn('Reset password API failed:', error);
      throw new Error('Failed to reset password');
    }
  }

  /**
   * Logout user and clear stored data
   */
  logout(): void {
    this.clearToken();
    this.clearUser();
  }

  /**
   * Get current user from storage
   */
  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem(this.userKey);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Get stored authentication token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getCurrentUser();
    
    if (!token || !user) {
      return false;
    }

    // For mock tokens, just check if they exist and user is active
    if (this.isMockToken(token)) {
      return user.is_active;
    }

    // For real tokens, check expiration
    return !this.isTokenExpired(token);
  }

  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<User> {
    const { email, password, firstName, lastName, role } = data;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
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
    } catch (error) {
      console.warn('Registration API failed, falling back to mock:', error);
      return this.mockRegister(data);
    }
  }

  /**
   * Verify user OTP
   */
  async verifyOTP(email: string, otp: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      return data.success === true;
    } catch (error) {
      console.warn('OTP verification API failed:', error);
      // Mock verification: Accept only "123456" as valid OTP
      await new Promise(resolve => setTimeout(resolve, 500));
      return otp === '123456';
    }
  }

  // ==================== MOCK METHODS ====================

  /**
   * Mock login for development/testing
   */
  private async mockLogin(email: string, password: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const credential = MOCK_CREDENTIALS.find(
      cred => cred.email === email && cred.password === password
    );
    
    if (!credential) {
      throw new Error('Invalid email or password');
    }

    const user = MOCK_USERS.find(u => u.email === email);
    
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.is_active) {
      throw new Error('Account is deactivated');
    }

    const mockToken = this.generateMockToken(user);
    this.setToken(mockToken);
    this.setUser(user);

    return user;
  }

  /**
   * Mock register
   */
  private async mockRegister(data: RegisterData): Promise<User> {
    const { email, password, firstName, lastName, role } = data;

    await new Promise(resolve => setTimeout(resolve, 800));

    if (MOCK_USERS.some(user => user.email === email)) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      email,
      first_name: firstName,
      last_name: lastName,
      is_active: true,
      designation_name: 'Mock Hospital',
      role_names: [role],
    };

    MOCK_USERS.push(newUser);
    MOCK_CREDENTIALS.push({ email, password });

    const token = this.generateMockToken(newUser);
    this.setToken(token);
    this.setUser(newUser);

    return newUser;
  }

  /**
   * Get all mock users (for testing/development)
   */
  getMockUsers(): User[] {
    return MOCK_USERS;
  }

  /**
   * Get mock credentials (for testing/development)
   */
  getMockCredentials(): { email: string; password: string }[] {
    return MOCK_CREDENTIALS.map(cred => ({ ...cred }));
  }

  // ==================== PRIVATE HELPERS ====================

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
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  private isMockToken(token: string): boolean {
    return token.startsWith('mock-token-');
  }

  private generateMockToken(user: User): string {
    const payload = {
      email: user.email,
      role: user.role_names[0],
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
    };
    
    return `mock-token-${btoa(JSON.stringify(payload))}`;
  }
}

// Create and export singleton instance
export const authService = new AuthService();

// Export the class for testing purposes
export { AuthService };