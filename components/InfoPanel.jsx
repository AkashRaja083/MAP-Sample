import { useState } from "react";
import { HOSPITALS, DISTRICT_COORDS, getHospitalsByDistrict } from "../data/hospitals";

export default function InfoPanel({ selectedDistrict, onDistrictSelect, selectedHospital }) {
  const [search, setSearch] = useState("");
  const [activeDistrict, setActiveDistrict] = useState(null);

  const totalBeds = HOSPITALS.reduce((s, h) => s + h.beds, 0);
  const govtCount = HOSPITALS.filter(h => h.type === "Government").length;
  const privateCount = HOSPITALS.filter(h => h.type === "Private").length;

  const filteredHospitals = HOSPITALS.filter(h => {
    const q = search.toLowerCase();
    return (
      h.name.toLowerCase().includes(q) ||
      h.district.toLowerCase().includes(q) ||
      h.specialty.toLowerCase().includes(q)
    );
  });

  // Districts grouped with hospital counts, sorted by hospital count desc
  const districts = Object.keys(DISTRICT_COORDS).map(name => ({
    name,
    hospitals: getHospitalsByDistrict(name)
  })).sort((a, b) => b.hospitals.length - a.hospitals.length);

  return (
    <div style={{ color: "#e2e8f0", height: "100%", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <div style={{ marginBottom: "18px", flexShrink: 0 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)",
          borderRadius: "8px", padding: "4px 10px", marginBottom: "10px"
        }}>
          <span style={{ fontSize: "0.65rem", color: "#93c5fd", letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 600 }}>
            🏥 TN Hospital GIS
          </span>
        </div>
        <h1 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.3, margin: 0 }}>
          Tamil Nadu<br />
          <span style={{ color: "#60a5fa" }}>Hospital Mapping</span>
        </h1>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px", flexShrink: 0 }}>
        {[
          { label: "Hospitals",   value: HOSPITALS.length,          icon: "🏥", color: "#3b82f6" },
          { label: "Total Beds",  value: totalBeds.toLocaleString(), icon: "🛏", color: "#4ade80" },
          { label: "Government",  value: govtCount,                  icon: "🔵", color: "#60a5fa" },
          { label: "Private",     value: privateCount,               icon: "🟣", color: "#c084fc" },
        ].map(card => (
          <div key={card.label} style={{
            background: "rgba(30,41,59,0.8)", border: "1px solid #334155",
            borderRadius: "10px", padding: "10px 8px", textAlign: "center"
          }}>
            <div style={{ fontSize: "1.2rem", marginBottom: "3px" }}>{card.icon}</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: card.color }}>{card.value}</div>
            <div style={{ fontSize: "0.6rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.04em" }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Selected Hospital Card */}
      {selectedHospital && (
        <div style={{
          flexShrink: 0,
          background: selectedHospital.type === "Government"
            ? "linear-gradient(135deg,rgba(29,78,216,0.3),rgba(59,130,246,0.15))"
            : "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(168,85,247,0.15))",
          border: `1px solid ${selectedHospital.type === "Government" ? "rgba(59,130,246,0.5)" : "rgba(168,85,247,0.5)"}`,
          borderRadius: "10px", padding: "12px", marginBottom: "14px"
        }}>
          <div style={{ fontSize: "0.6rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            📌 Selected
          </div>
          <div style={{ fontWeight: 700, color: "#f1f5f9", fontSize: "0.85rem", marginTop: "4px", lineHeight: 1.3 }}>
            {selectedHospital.name}
          </div>
          <div style={{ display: "flex", gap: "12px", marginTop: "6px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>📍 {selectedHospital.district}</span>
            <span style={{ fontSize: "0.72rem", color: "#4ade80" }}>🛏 {selectedHospital.beds.toLocaleString()} beds</span>
            <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>🏥 {selectedHospital.specialty}</span>
          </div>
        </div>
      )}

      {/* Search */}
      <div style={{ position: "relative", marginBottom: "12px", flexShrink: 0 }}>
        <input
          type="text"
          placeholder="Search hospitals, districts, specialties…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", background: "rgba(30,41,59,0.8)",
            border: "1px solid #334155", borderRadius: "8px",
            color: "#e2e8f0", padding: "8px 12px 8px 32px",
            fontSize: "0.78rem", outline: "none", boxSizing: "border-box"
          }}
        />
        <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "0.8rem" }}>🔍</span>
      </div>

      {/* District filter chips */}
      {!search && (
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px", flexShrink: 0 }}>
          <button
            onClick={() => { setActiveDistrict(null); onDistrictSelect && onDistrictSelect(null); }}
            style={{
              padding: "4px 10px", borderRadius: "20px", border: "1px solid",
              fontSize: "0.68rem", cursor: "pointer", fontWeight: 600,
              background: !activeDistrict ? "#3b82f6" : "transparent",
              borderColor: activeDistrict ? "#334155" : "#3b82f6",
              color: !activeDistrict ? "#fff" : "#64748b"
            }}
          >
            All
          </button>
          {districts.map(d => (
            <button
              key={d.name}
              onClick={() => {
                const next = activeDistrict === d.name ? null : d.name;
                setActiveDistrict(next);
                onDistrictSelect && onDistrictSelect(next);
              }}
              style={{
                padding: "4px 10px", borderRadius: "20px", border: "1px solid",
                fontSize: "0.68rem", cursor: "pointer", fontWeight: 600,
                background: activeDistrict === d.name ? "#3b82f6" : "transparent",
                borderColor: activeDistrict === d.name ? "#3b82f6" : "#334155",
                color: activeDistrict === d.name ? "#fff" : "#94a3b8"
              }}
            >
              {d.name} <span style={{ opacity: 0.6 }}>({d.hospitals.length})</span>
            </button>
          ))}
        </div>
      )}

      {/* Hospital list */}
      <div style={{ flex: 1, overflowY: "auto", paddingRight: "2px", display: "flex", flexDirection: "column", gap: "8px" }}>
        {filteredHospitals
          .filter(h => !activeDistrict || h.district === activeDistrict)
          .map(h => (
            <div key={h.id} style={{
              background: selectedHospital?.id === h.id
                ? (h.type === "Government" ? "rgba(29,78,216,0.25)" : "rgba(124,58,237,0.25)")
                : "rgba(30,41,59,0.7)",
              border: `1px solid ${
                selectedHospital?.id === h.id
                  ? (h.type === "Government" ? "#3b82f6" : "#a855f7")
                  : "#334155"
              }`,
              borderRadius: "10px",
              padding: "10px 12px",
              borderLeft: `3px solid ${h.type === "Government" ? "#3b82f6" : "#a855f7"}`,
              transition: "background 0.2s, border-color 0.2s"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#e2e8f0", lineHeight: 1.3 }}>
                    {h.name}
                  </div>
                  <div style={{ fontSize: "0.65rem", color: "#64748b", marginTop: "3px" }}>
                    📍 {h.district} · {h.specialty}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: "0.78rem", color: "#4ade80", fontWeight: 700 }}>{h.beds.toLocaleString()}</div>
                  <div style={{ fontSize: "0.6rem", color: "#475569" }}>beds</div>
                </div>
              </div>
              <div style={{ marginTop: "7px", display: "flex", gap: "6px", alignItems: "center" }}>
                <span style={{
                  fontSize: "0.6rem", padding: "2px 7px", borderRadius: "4px",
                  background: h.type === "Government" ? "rgba(59,130,246,0.2)" : "rgba(168,85,247,0.2)",
                  color: h.type === "Government" ? "#93c5fd" : "#d8b4fe",
                  border: `1px solid ${h.type === "Government" ? "rgba(59,130,246,0.4)" : "rgba(168,85,247,0.4)"}`,
                  fontWeight: 600
                }}>
                  {h.type}
                </span>
                <span style={{ fontSize: "0.62rem", color: "#475569" }}>
                  {h.lat.toFixed(4)}°N, {h.lng.toFixed(4)}°E
                </span>
              </div>
            </div>
          ))}

        {filteredHospitals.filter(h => !activeDistrict || h.district === activeDistrict).length === 0 && (
          <div style={{ textAlign: "center", color: "#475569", fontSize: "0.8rem", padding: "32px 0" }}>
            No hospitals found
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        flexShrink: 0,
        marginTop: "12px", paddingTop: "10px",
        borderTop: "1px solid #1e293b",
        fontSize: "0.65rem", color: "#475569", textAlign: "center"
      }}>
        {HOSPITALS.length} hospitals · {Object.keys(DISTRICT_COORDS).length} districts · TN GIS 2026
      </div>
    </div>
  );
}