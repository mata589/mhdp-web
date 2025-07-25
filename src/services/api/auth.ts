// src/services/api/auth.ts
import type { RegisterData, User } from '../../types/user.types';
import { CONFIG, buildApiUrl, shouldUseMockData } from '../../utils/config';

interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

// Sample test users - remove in production
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@callcenter.com',
    name: 'John Admin',
    role: 'admin',
    hospital: 'Central General Hospital',
    isActive: true,
    lastLogin: new Date(),
  },
  {
    id: '2',
    email: 'supervisor@callcenter.com',
    name: 'Sarah Supervisor',
    role: 'supervisor',
    hospital: 'St. Mary Medical Center',
    isActive: true,
    lastLogin: new Date(),
  },
  {
    id: '3',
    email: 'agent@callcenter.com',
    name: 'Mike Agent',
    role: 'agent',
    hospital: 'Central General Hospital',
    isActive: true,
    lastLogin: new Date(),
  },
  {
    id: '4',
    email: 'jane.agent@callcenter.com',
    name: 'Jane Smith',
    role: 'agent',
    hospital: 'City Medical Center',
    isActive: true,
    lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
  },
  {
    id: '5',
    email: 'supervisor2@callcenter.com',
    name: 'Robert Wilson',
    role: 'supervisor',
    hospital: 'City Medical Center',
    isActive: true,
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
];

// Mock credentials (password is "password123" for all users)
const MOCK_CREDENTIALS = [
  { email: 'admin@callcenter.com', password: 'password123' },
  { email: 'supervisor@callcenter.com', password: 'password123' },
  { email: 'agent@callcenter.com', password: 'password123' },
  { email: 'jane.agent@callcenter.com', password: 'password123' },
  { email: 'supervisor2@callcenter.com', password: 'password123' },
];

class AuthService {
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';
  private userKey = 'auth_user';

  /**
   * Login user with email and password
   */
  async login(email: string, password: string): Promise<User> {
    // Try API first, fallback to mock data
    if (!shouldUseMockData()) {
      try {
        const response = await fetch(buildApiUrl('/auth/login'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
          signal: AbortSignal.timeout(CONFIG.API_TIMEOUT),
        });

        if (response.ok) {
          const data: LoginResponse = await response.json();
          this.setTokens(data.token, data.refreshToken);
          this.setUser(data.user);
          return data.user;
        }
      } catch (error) {
        console.warn('API not reachable, falling back to mock data:', error);
      }
    }

    // Mock authentication logic
    return this.mockLogin(email, password);
  }

  /**
   * Mock login for development/testing
   */
  private async mockLogin(email: string, password: string): Promise<User> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find user in mock credentials
    const credential = MOCK_CREDENTIALS.find(cred => cred.email === email && cred.password === password);
    
    if (!credential) {
      throw new Error('Invalid email or password');
    }

    // Find user data
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }

    // Generate mock tokens
    const mockToken = this.generateMockToken(user);
    const mockRefreshToken = this.generateMockRefreshToken(user);

    // Store tokens and user data
    this.setTokens(mockToken, mockRefreshToken);
    this.setUser(user);

    return user;
  }

  /**
   * Logout user and clear stored data
   */
  logout(): void {
    if (!shouldUseMockData()) {
      try {
        // Optional: Call logout endpoint to invalidate server-side session
        fetch(buildApiUrl('/auth/logout'), {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(CONFIG.API_TIMEOUT),
        }).catch(() => {
          // Ignore errors on logout endpoint call
        });
      } catch (error) {
        console.warn('Logout endpoint error:', error);
      }
    }

    // Always clear local storage
    this.clearTokens();
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
   * Get stored refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
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
    if (shouldUseMockData() || this.isMockToken(token)) {
      return user.isActive;
    }

    // For real tokens, check expiration
    return !this.isTokenExpired(token);
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<string> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    // Try API first
    if (!shouldUseMockData() && !this.isMockToken(refreshToken)) {
      try {
        const response = await fetch(buildApiUrl('/auth/refresh'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
          signal: AbortSignal.timeout(CONFIG.API_TIMEOUT),
        });

        if (response.ok) {
          const data = await response.json();
          this.setTokens(data.token, data.refreshToken);
          return data.token;
        }
      } catch (error) {
        console.warn('API refresh failed, using mock refresh:', error);
      }
    }

    // Mock refresh
    return this.mockRefreshToken();
  }

  /**
   * Mock token refresh
   */
  private async mockRefreshToken(): Promise<string> {
    const user = this.getCurrentUser();
    
    if (!user) {
      throw new Error('No user found for token refresh');
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newToken = this.generateMockToken(user);
    const newRefreshToken = this.generateMockRefreshToken(user);
    
    this.setTokens(newToken, newRefreshToken);
    return newToken;
  }

  // ... (rest of the methods remain the same as in the previous version)
  // I'll include the key methods but truncate for brevity

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

  // Private helper methods
  private setTokens(token: string, refreshToken?: string): void {
    localStorage.setItem(this.tokenKey, token);
    if (refreshToken) {
      localStorage.setItem(this.refreshTokenKey, refreshToken);
    }
  }

  private clearTokens(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
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
    return token.startsWith('mock-token-') || token.startsWith('mock-refresh-');
  }

  private generateMockToken(user: User): string {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
    };
    
    return `mock-token-${btoa(JSON.stringify(payload))}`;
  }

  private generateMockRefreshToken(user: User): string {
    const payload = {
      userId: user.id,
      type: 'refresh',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // 7 days
    };
    
    return `mock-refresh-${btoa(JSON.stringify(payload))}`;
  }

  /**
 * Register a new user
 */
/**
 * Register a new user
 */
async register(data: RegisterData): Promise<User> {
  const { email, password, firstName, lastName, role } = data;
  const name = `${firstName} ${lastName}`;
  const hospital = 'Unknown Hospital'; // Default or modify as needed

  if (!shouldUseMockData()) {
    try {
      const response = await fetch(buildApiUrl('/auth/register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstName, lastName, role }),
        signal: AbortSignal.timeout(CONFIG.API_TIMEOUT),
      });

      if (response.ok) {
        const result: LoginResponse = await response.json();
        this.setTokens(result.token, result.refreshToken);
        this.setUser(result.user);
        return result.user;
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    }
  }

  // Fallback to mock register
  return this.mockRegister(data);
}


private async mockRegister(data: RegisterData): Promise<User> {
  const { email, password, firstName, lastName, role } = data;
  const name = `${firstName} ${lastName}`;
  const hospital = 'Mock Hospital';

  await new Promise(resolve => setTimeout(resolve, 800));

  if (MOCK_USERS.some(user => user.email === email)) {
    throw new Error('User already exists');
  }

  const newUser: User = {
    id: (MOCK_USERS.length + 1).toString(),
    email,
    name,
    role,
    hospital,
    isActive: true,
    lastLogin: new Date(),
  };

  MOCK_USERS.push(newUser);
  MOCK_CREDENTIALS.push({ email, password });

  const token = this.generateMockToken(newUser);
  const refreshToken = this.generateMockRefreshToken(newUser);
  this.setTokens(token, refreshToken);
  this.setUser(newUser);

  return newUser;
}

/**
 * Verify user OTP
 */
async verifyOTP(email: string, otp: string): Promise<boolean> {
  if (!shouldUseMockData()) {
    try {
      const response = await fetch(buildApiUrl('/auth/verify-otp'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
        signal: AbortSignal.timeout(CONFIG.API_TIMEOUT),
      });

      if (response.ok) {
        const data = await response.json();
        return data.success === true;
      } else {
        throw new Error('OTP verification failed');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      return false;
    }
  }

  // Mock verification: Accept only "123456" as valid OTP
  await new Promise(resolve => setTimeout(resolve, 500));
  return otp === '123456';
}

}

// Create and export singleton instance
export const authService = new AuthService();

// Export the class for testing purposes
export { AuthService };