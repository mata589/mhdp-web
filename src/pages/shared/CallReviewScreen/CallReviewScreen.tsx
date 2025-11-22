import React, { useState } from "react";
import { ArrowLeft, Phone, PhoneMissed, Clock } from 'lucide-react';

export const CallReviewScreen = () => {
  const [callNotes, setCallNotes] = useState(
    "I tried reaching the caller, but they were unavailable."
  );

  const callData = {
    id: "2031",
    callerId: "#2031",
    status: "Missed",
    lastCall: "Jul 13, 2025 | 10:43AM",
    callCount: 10,
    riskLevel: "Critical",
  };

  const callHistory = [
    { time: "10:40 AM", status: "Missed", id: "#2031" },
    { time: "10:40 AM", status: "Missed", id: "#2031" },
    { time: "10:39 AM", status: "Missed", id: "#2031" },
    { time: "10:38 AM", status: "Missed", id: "#2031" },
    { time: "10:36 AM", status: "Missed", id: "#2031" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "0",
        maxWidth: "1280px",
        margin: "0 auto"
      }}>
        <style>{`
          @media (min-width: 1024px) {
            .desktop-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 24px;
              padding: 16px;
            }
          }

           @media (max-width: 1023px) {
            .desktop-grid > div {
              padding-right: 0;
            }
            
            /* Add mobile-specific padding: 8px for outer container */
            .mobile-outer-container {
              padding: 5px !important;
            }
            
            /* Add mobile-specific padding: 10px for all cards */
            .mobile-card {
              padding: 5px !important;
            }
          }
          
        `}</style>

        <div className="desktop-grid mobile-outer-container">
          
          {/* Main Content - Left Side */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Call Info Card */}
            <div  className="mobile-card" style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              border: "1px solid #e5e5e5",
              padding: "24px"
            }}>
              
              {/* Header Section */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "24px"
              }}>
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <button style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    color: "#333333"
                  }}>
                    <ArrowLeft size={24} />
                  </button>

                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "4px",
                      flexWrap: "wrap"
                    }}>
                      <h1 style={{
                        fontSize: "28px",
                        fontWeight: "bold",
                        color: "#000000",
                        margin: "0"
                      }}>
                        Missed call #{callData.id}
                      </h1>
                      <span style={{
                        backgroundColor: "#fce4ec",
                        color: "#c2185b",
                        padding: "4px 12px",
                        borderRadius: "16px",
                        fontSize: "12px",
                        fontWeight: "600"
                      }}>
                        Missed
                      </span>
                    </div>
                    <p style={{
                      fontSize: "14px",
                      color: "#666666",
                      margin: "0"
                    }}>
                      Last call: {callData.lastCall}
                    </p>
                  </div>
                </div>

                <button style={{
                  backgroundColor: "#17a2b8",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "background-color 0.2s",
                  width: "100%"
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0f8896"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#17a2b8"}
                >
                  <Phone size={18} />
                  Call back
                </button>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: "24px",
                backgroundColor: "#f9f9f9",
                padding: "24px",
                borderRadius: "8px"
              }}>
                <div>
                  <p style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "#999999",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    margin: "0 0 8px 0"
                  }}>
                    Caller ID
                  </p>
                  <p style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#000000",
                    margin: "0"
                  }}>
                    {callData.callerId}
                  </p>
                </div>

                <div>
                  <p style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "#999999",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    margin: "0 0 8px 0"
                  }}>
                    Status
                  </p>
                  <span style={{
                    backgroundColor: "#fce4ec",
                    color: "#c2185b",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: "600",
                    display: "inline-block"
                  }}>
                    Missed
                  </span>
                </div>

                <div>
                  <p style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "#999999",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    margin: "0 0 8px 0"
                  }}>
                    Call Count
                  </p>
                  <p style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#000000",
                    margin: "0"
                  }}>
                    {callData.callCount}
                  </p>
                </div>

                <div>
                  <p style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "#999999",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    margin: "0 0 8px 0"
                  }}>
                    Risk Level
                  </p>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#d32f2f",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}>
                    <span style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#d32f2f"
                    }}></span>
                    Critical
                  </span>
                </div>
              </div>
            </div>

            {/* Call Notes Card */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              border: "1px solid #e5e5e5",
              padding: "24px"
            }}>
              <h2 style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#000000",
                margin: "0 0 16px 0"
              }}>
                Call Notes
              </h2>
              
              <textarea
                value={callNotes}
                onChange={(e) => setCallNotes(e.target.value)}
                placeholder="Add notes about the call, symptoms discussed, recommendations given"
                style={{
                  width: "100%",
                  height: "200px",
                  padding: "16px",
                  border: "1px solid #dddddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                  color: "#333333",
                  fontFamily: "inherit",
                  resize: "none",
                  boxSizing: "border-box"
                }}
              />
              
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "16px",
                gap: "12px"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#666666",
                  fontSize: "14px"
                }}>
                  <Clock size={16} />
                  Auto-save enabled
                </div>
                <button style={{
                  backgroundColor: "#17a2b8",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0f8896"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#17a2b8"}
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>

          {/* Call History Sidebar - Right Side */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            border: "1px solid #e5e5e5",
            padding: "24px"
          }}>
            
            <h2 style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#000000",
              margin: "0 0 16px 0"
            }}>
              Call history
            </h2>
            
            <p style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#666666",
              margin: "0 0 16px 0"
            }}>
              Jul 13, 2025
            </p>

            {/* Call History Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {callHistory.map((call, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #e5e5e5",
                    cursor: "pointer",
                    transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "#ffebee",
                    flexShrink: 0
                  }}>
                    <PhoneMissed size={18} style={{ color: "#d32f2f" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#000000",
                      margin: "0 0 4px 0"
                    }}>
                      {call.time}
                    </p>
                    <p style={{
                      fontSize: "12px",
                      color: "#666666",
                      margin: "0"
                    }}>
                      {call.status} | Call ID: {call.id}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
