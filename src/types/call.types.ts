// src/types/call.types.ts
export interface CallData {
    id: string;
    anonymizedCallerId: string;
    dateTime: Date;
    duration: number;
    agentName: string;
    callerType: 'patient' | 'caregiver' | 'general_public';
    callerSex: 'male' | 'female' | 'unknown';
    language: 'english' | 'luganda' | 'swahili';
    status: 'answered' | 'escalated' | 'voicemail' | 'missed';
    aiInsights: {
      symptoms: string[];
      sentimentScore: number;
      emotionScores: {
        anger: number;
        sadness: number;
        fear: number;
        joy: number;
      };
      qualityScores: {
        rapport: number;
        listening: number;
        analyzing: number;
        motivating: number;
        ending: number;
      };
      escalationFlags: string[];
      keywords: string[];
    };
    transcript?: string;
    audioUrl?: string;
    isReviewed: boolean;
    reviewNotes?: string;
  }
  
  export interface DashboardMetrics {
    totalCalls: number;
    callsAnswered: number;
    callsEscalated: number;
    averageDuration: number;
    topSymptoms: { symptom: string; count: number; percentage: number }[];
    sentimentDistribution: { positive: number; neutral: number; negative: number };
    qualityDistribution: { good: number; fair: number; poor: number };
  }