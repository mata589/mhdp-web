// src/services/api/calls.ts
import type { Call } from '../../types/user.types';
import { CONFIG, buildApiUrl, shouldUseMockData } from '../../utils/config';


// Mock data for development
const MOCK_CALLS: Call[] = [
  {
    id: '1',
    patientName: 'John Doe',
    phoneNumber: '+1234567890',
    callType: 'emergency',
    status: 'completed',
    startTime: new Date(Date.now() - 3600000), // 1 hour ago
    endTime: new Date(Date.now() - 3300000), // 55 minutes ago
    duration: 300, // 5 minutes
    agentId: '3',
    hospitalId: 'central-general',
    symptoms: ['chest pain', 'shortness of breath'],
    urgency: 'high',
    notes: 'Patient experiencing chest pain, advised to call ambulance',
  },
  // Add more mock calls...
];

class CallsService {
  /**
   * Get all calls with optional filters
   */
  async getCalls(filters?: {
    status?: string;
    agentId?: string;
    hospitalId?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<Call[]> {
    if (!shouldUseMockData()) {
      try {
        const params = new URLSearchParams();
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value.toString());
          });
        }

        const response = await fetch(buildApiUrl(`/calls?${params.toString()}`), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.getAuthToken()}`,
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(CONFIG.API_TIMEOUT),
        });

        if (response.ok) {
          return await response.json();
        }
      } catch (error) {
        console.warn('API not reachable, using mock data:', error);
      }
    }

    // Return mock data
    return this.filterMockCalls(MOCK_CALLS, filters);
  }

  /**
   * Get a specific call by ID
   */
  async getCallById(callId: string): Promise<Call | null> {
    if (!shouldUseMockData()) {
      try {
        const response = await fetch(buildApiUrl(`/calls/${callId}`), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.getAuthToken()}`,
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(CONFIG.API_TIMEOUT),
        });

        if (response.ok) {
          return await response.json();
        }
      } catch (error) {
        console.warn('API not reachable, using mock data:', error);
      }
    }

    // Return mock data
    return MOCK_CALLS.find(call => call.id === callId) || null;
  }

  /**
   * Create a new call record
   */
  async createCall(callData: Omit<Call, 'id'>): Promise<Call> {
    if (!shouldUseMockData()) {
      try {
        const response = await fetch(buildApiUrl('/calls'), {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.getAuthToken()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(callData),
          signal: AbortSignal.timeout(CONFIG.API_TIMEOUT),
        });

        if (response.ok) {
          return await response.json();
        }
      } catch (error) {
        console.warn('API not reachable, using mock creation:', error);
      }
    }

    // Mock creation
    const newCall: Call = {
      ...callData,
      id: Date.now().toString(),
    };
    
    MOCK_CALLS.push(newCall);
    return newCall;
  }

  // Private helper methods
  private getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private filterMockCalls(calls: Call[], filters?: any): Call[] {
    if (!filters) return calls;

    return calls.filter(call => {
      if (filters.status && call.status !== filters.status) return false;
      if (filters.agentId && call.agentId !== filters.agentId) return false;
      if (filters.hospitalId && call.hospitalId !== filters.hospitalId) return false;
      // Add more filter logic as needed
      return true;
    });
  }
}

export const callsService = new CallsService();