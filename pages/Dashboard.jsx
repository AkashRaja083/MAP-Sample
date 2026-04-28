import React, { useState } from "react";
import MapView from "../components/MapView";
import InfoPanel from "../components/InfoPanel";

export default function Dashboard() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      width: "100vw",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      background: "#0a0f1e",
      overflow: "hidden",
      gap: "0"
    }}>
      {/* Sidebar */}
      <div style={{
        width: "320px",
        flexShrink: 0,
        background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
        borderRight: "1px solid #334155",
        padding: "20px 16px",
        overflowY: "auto",
        overflowX: "hidden",
        color: "#e2e8f0",
        display: "flex",
        flexDirection: "column"
      }}>
        <InfoPanel
          selectedDistrict={selectedDistrict}
          onDistrictSelect={setSelectedDistrict}
          selectedHospital={selectedHospital}
        />
      </div>

      {/* Right side — map area with padding and box */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        background: "#0a0f1e",
        overflow: "hidden",
        gap: "12px"
      }}>
        {/* Top bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0
        }}>
          <div>
            <h2 style={{
              margin: 0,
              fontSize: "1rem",
              fontWeight: 700,
              color: "#f1f5f9",
              letterSpacing: "-0.01em"
            }}>
              🗺 Tamil Nadu — Hospital Locations
            </h2>
            <p style={{ margin: 0, fontSize: "0.72rem", color: "#475569", marginTop: "2px" }}>
              {selectedDistrict ? `Filtered: ${selectedDistrict}` : "Showing all 10 districts · 23 hospitals"}
            </p>
          </div>
          <div style={{
            fontSize: "0.68rem",
            color: "#475569",
            background: "rgba(30,41,59,0.6)",
            border: "1px solid #334155",
            borderRadius: "6px",
            padding: "4px 10px"
          }}>
            Click a pin for details
          </div>
        </div>

        {/* Map box */}
        <div style={{
          flex: 1,
          border: "1px solid #334155",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 0 0 1px rgba(59,130,246,0.08), 0 8px 40px rgba(0,0,0,0.5)",
          position: "relative",
          minHeight: 0   /* allows flex child to shrink properly */
        }}>
          <MapView
            selectedDistrict={selectedDistrict}
            onDistrictSelect={setSelectedDistrict}
            onHospitalSelect={setSelectedHospital}
          />
        </div>
      </div>
    </div>
  );
}