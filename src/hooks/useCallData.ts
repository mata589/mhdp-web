import { useEffect, useState } from "react";
import type { CallData } from "../types/call.types";


export const useCallData = () => {
  const [data, setData] = useState<CallData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Simulated call data
        const fakeData: CallData[] = [
          {
            id: "call-001",
            anonymizedCallerId: "anon-9981",
            dateTime: new Date(),
            duration: 180,
            agentName: "Hezron Jahmia",
            callerType: "patient",
            callerSex: "female",
            language: "english",
            status: "answered",
            aiInsights: {
              symptoms: ["fever", "headache"],
              sentimentScore: 0.7,
              emotionScores: {
                anger: 0.1,
                sadness: 0.2,
                fear: 0.1,
                joy: 0.6,
              },
              qualityScores: {
                rapport: 4,
                listening: 5,
                analyzing: 3,
                motivating: 4,
                ending: 4,
              },
              escalationFlags: ["urgent", "needs-followup"],
              keywords: ["malaria", "pain", "clinic"],
            },
            transcript: "Caller mentioned symptoms of malaria and asked about clinic hours.",
            audioUrl: "https://example.com/audio/call-001.mp3",
            isReviewed: false,
            reviewNotes: "",
          },
          {
            id: "call-002",
            anonymizedCallerId: "anon-9982",
            dateTime: new Date(),
            duration: 240,
            agentName: "Hezron Jahmia",
            callerType: "caregiver",
            callerSex: "male",
            language: "luganda",
            status: "escalated",
            aiInsights: {
              symptoms: ["cough", "shortness of breath"],
              sentimentScore: 0.4,
              emotionScores: {
                anger: 0.2,
                sadness: 0.3,
                fear: 0.4,
                joy: 0.1,
              },
              qualityScores: {
                rapport: 3,
                listening: 3,
                analyzing: 4,
                motivating: 2,
                ending: 3,
              },
              escalationFlags: ["escalation-required"],
              keywords: ["covid", "emergency"],
            },
            transcript: "Caregiver reported signs of respiratory distress.",
            audioUrl: "",
            isReviewed: false,
            reviewNotes: "",
          }
        ];

        setData(fakeData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch call data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate metrics
  const metrics = {
    totalCalls: data.length,
    callsAnswered: data.filter(call => call.status === "answered").length,
    callsEscalated: data.filter(call => call.status === "escalated").length,
    averageDuration: data.length > 0
      ? Math.round(data.reduce((sum, call) => sum + call.duration, 0) / data.length)
      : 0,
  };

  const escalatedCalls = data.filter(call => call.status === "escalated");

  return {
    metrics,
    escalatedCalls,
    isLoading: loading,
    error,
  };
};
