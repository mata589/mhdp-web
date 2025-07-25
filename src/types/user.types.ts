// src/types/user.types.ts
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'agent' | 'supervisor' | 'admin';
    hospital: string;
    isActive: boolean;
    lastLogin?: Date;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }



  // 5. src/types/auth.types.ts
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  role: 'agent' | 'supervisor' | 'admin';
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


// src/types/call.types.ts

export interface Call {
  id: string;
  patientName: string;
  phoneNumber: string;
  callType: 'emergency' | 'routine';
  status: 'completed' | 'missed' | 'ongoing';
  startTime: Date;
  endTime: Date;
  duration: number; // in seconds
  agentId: string;
  hospitalId: string;
  symptoms: string[];
  urgency: 'low' | 'medium' | 'high';
  notes?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}