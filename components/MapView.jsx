import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import L from "leaflet";
import { HOSPITALS, DISTRICT_COORDS } from "../data/hospitals";

// ── Available map colour themes ──────────────────────────────────────────────
const MAP_STYLES = [
  {
    id: "dark",
    label: "Dark",
    emoji: "🌑",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: "© OpenStreetMap © CARTO",
    preview: "#1a1a2e",
  },
  {
    id: "light",
    label: "Light",
    emoji: "☀️",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: "© OpenStreetMap © CARTO",
    preview: "#e8e8e8",
  },
  {
    id: "voyager",
    label: "Voyager",
    emoji: "🗺",
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution: "© OpenStreetMap © CARTO",
    preview: "#d4e6c3",
  },
  {
    id: "blue",
    label: "Blue Night",
    emoji: "🌊",
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    attribution: "© Stadia Maps © OpenMapTiles © OpenStreetMap",
    preview: "#0d2137",
  },
  {
    id: "osm",
    label: "Street",
    emoji: "🛣",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap contributors",
    preview: "#f5f3eb",
  },
];

// Fix Leaflet default icon broken paths in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom SVG pin icons per hospital type
function createHospitalIcon(type) {
  const color = type === "Government" ? "#3b82f6" : "#a855f7";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.4)"/>
        </filter>
      </defs>
      <path d="M16 0 C7.2 0 0 7.2 0 16 C0 26 16 40 16 40 C16 40 32 26 32 16 C32 7.2 24.8 0 16 0 Z"
            fill="${color}" filter="url(#shadow)"/>
      <circle cx="16" cy="15" r="11" fill="white" opacity="0.95"/>
      <rect x="13" y="9" width="6" height="12" rx="1" fill="#e11d48"/>
      <rect x="10" y="12" width="12" height="6" rx="1" fill="#e11d48"/>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -42],
  });
}

// Inner component: flies the map to selected district using useMap hook
function MapController({ selectedDistrict }) {
  const map = useMap();

  useEffect(() => {
    if (selectedDistrict && DISTRICT_COORDS[selectedDistrict]) {
      const { lat, lng } = DISTRICT_COORDS[selectedDistrict];
      map.flyTo([lat, lng], 11, { animate: true, duration: 1.2 });
    } else if (!selectedDistrict) {
      // Reset to full TN view
      map.flyTo([10.8, 78.6], 7, { animate: true, duration: 1.0 });
    }
  }, [selectedDistrict, map]);

  return null;
}

export default function MapView({ selectedDistrict, onDistrictSelect, onHospitalSelect }) {
  const [showGovt, setShowGovt] = useState(true);
  const [showPrivate, setShowPrivate] = useState(true);
  const [mapStyle, setMapStyle] = useState(MAP_STYLES[0]); // default: Dark

  const districts = Object.keys(DISTRICT_COORDS);

  const filteredHospitals = HOSPITALS.filter(h => {
    if (h.type === "Government" && !showGovt) return false;
    if (h.type === "Private" && !showPrivate) return false;
    if (selectedDistrict && h.district !== selectedDistrict) return false;
    return true;
  });

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>

      {/* ── Top-left: Map colour theme switcher ── */}
      <div style={{
        position: "absolute", top: "12px", left: "52px", zIndex: 1000,
        background: "rgba(15,23,42,0.92)", border: "1px solid #334155",
        borderRadius: "10px", padding: "10px 12px",
        backdropFilter: "blur(8px)", boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
      }}>
        <div style={{ fontSize: "0.62rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
          🎨 Map Colour
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {MAP_STYLES.map(style => (
            <div
              key={style.id}
              onClick={() => setMapStyle(style)}
              title={style.label}
              style={{
                width: "32px", height: "32px", borderRadius: "7px",
                background: style.preview,
                border: `2px solid ${mapStyle.id === style.id ? "#60a5fa" : "#334155"}`,
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.85rem",
                transition: "border-color 0.15s, transform 0.15s",
                transform: mapStyle.id === style.id ? "scale(1.15)" : "scale(1)",
                boxShadow: mapStyle.id === style.id ? "0 0 0 2px rgba(96,165,250,0.35)" : "none"
              }}
            >
              {style.emoji}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "6px", fontSize: "0.68rem", color: "#60a5fa", textAlign: "center", fontWeight: 600 }}>
          {mapStyle.label}
        </div>
      </div>

      {/* ── Top-right: Hospital type filter ── */}
      <div style={{
        position: "absolute", top: "12px", right: "12px", zIndex: 1000,
        background: "rgba(15,23,42,0.92)", border: "1px solid #334155",
        borderRadius: "10px", padding: "10px 14px",
        display: "flex", flexDirection: "column", gap: "8px",
        backdropFilter: "blur(8px)", boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
      }}>
        <div style={{ fontSize: "0.62rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Filter by Type
        </div>
        {[
          { label: "🏥 Government", state: showGovt,    setter: setShowGovt,    color: "#3b82f6" },
          { label: "🏨 Private",    state: showPrivate, setter: setShowPrivate, color: "#a855f7" },
        ].map(f => (
          <div
            key={f.label}
            onClick={() => f.setter(s => !s)}
            style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
          >
            <div style={{
              width: "15px", height: "15px", borderRadius: "4px", flexShrink: 0,
              background: f.state ? f.color : "transparent",
              border: `2px solid ${f.color}`, transition: "background 0.2s"
            }} />
            <span style={{ fontSize: "0.76rem", color: "#cbd5e1", userSelect: "none" }}>{f.label}</span>
          </div>
        ))}
      </div>

      {/* ── Bottom-left: District filter panel ── */}
      <div style={{
        position: "absolute", bottom: "30px", left: "12px", zIndex: 1000,
        background: "rgba(15,23,42,0.95)", border: "1px solid #334155",
        borderRadius: "12px", padding: "12px",
        backdropFilter: "blur(10px)", boxShadow: "0 4px 24px rgba(0,0,0,0.55)",
        width: "170px"
      }}>
        <div style={{
          fontSize: "0.62rem", color: "#64748b",
          textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px"
        }}>
          📍 Filter by District
        </div>

        {/* "All" button */}
        <div
          onClick={() => onDistrictSelect && onDistrictSelect(null)}
          style={{
            padding: "5px 10px", borderRadius: "6px", marginBottom: "4px",
            background: !selectedDistrict ? "rgba(59,130,246,0.25)" : "transparent",
            border: `1px solid ${!selectedDistrict ? "#3b82f6" : "#1e293b"}`,
            color: !selectedDistrict ? "#60a5fa" : "#64748b",
            fontSize: "0.75rem", fontWeight: 600,
            cursor: "pointer", transition: "all 0.15s",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}
        >
          <span>All Districts</span>
          <span style={{ fontSize: "0.6rem", opacity: 0.6 }}>{HOSPITALS.length}</span>
        </div>

        {/* District list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3px", maxHeight: "200px", overflowY: "auto" }}>
          {districts.map(d => {
            const count = HOSPITALS.filter(h => h.district === d).length;
            const isSelected = selectedDistrict === d;
            return (
              <div
                key={d}
                onClick={() => onDistrictSelect && onDistrictSelect(isSelected ? null : d)}
                style={{
                  padding: "5px 10px", borderRadius: "6px",
                  background: isSelected ? "rgba(59,130,246,0.25)" : "transparent",
                  border: `1px solid ${isSelected ? "#3b82f6" : "#1e293b"}`,
                  color: isSelected ? "#60a5fa" : "#94a3b8",
                  fontSize: "0.75rem", fontWeight: isSelected ? 600 : 400,
                  cursor: "pointer", transition: "all 0.15s",
                  display: "flex", justifyContent: "space-between", alignItems: "center"
                }}
                onMouseEnter={e => {
                  if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={e => {
                  if (!isSelected) e.currentTarget.style.background = "transparent";
                }}
              >
                <span>{d}</span>
                <span style={{
                  fontSize: "0.6rem",
                  background: isSelected ? "rgba(59,130,246,0.4)" : "rgba(255,255,255,0.08)",
                  padding: "1px 5px", borderRadius: "8px",
                  color: isSelected ? "#93c5fd" : "#64748b"
                }}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend divider */}
        <div style={{ margin: "10px 0 8px", borderTop: "1px solid #1e293b" }} />
        <div style={{ fontSize: "0.62rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
          Legend
        </div>
        {[
          { color: "#3b82f6", label: "Government" },
          { color: "#a855f7", label: "Private" },
        ].map(item => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "4px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: item.color, flexShrink: 0 }} />
            <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Leaflet Map */}
      <MapContainer
        center={[10.8, 78.6]}
        zoom={7}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          key={mapStyle.id}
          url={mapStyle.url}
          attribution={mapStyle.attribution}
        />

        {/* Flies to district on selection */}
        <MapController selectedDistrict={selectedDistrict} />

        {/* Hospital markers */}
        {filteredHospitals.map(hospital => (
          <Marker
            key={hospital.id}
            position={[hospital.lat, hospital.lng]}
            icon={createHospitalIcon(hospital.type)}
            eventHandlers={{
              click: () => onHospitalSelect && onHospitalSelect(hospital)
            }}
          >
            <Popup closeButton={true}>
              <div style={{
                fontFamily: "Inter, sans-serif", minWidth: "210px",
                background: "#0f172a", color: "#e2e8f0",
                borderRadius: "8px", overflow: "hidden",
                margin: "-16px", padding: "0"
              }}>
                <div style={{
                  background: hospital.type === "Government"
                    ? "linear-gradient(135deg,#1d4ed8,#3b82f6)"
                    : "linear-gradient(135deg,#7c3aed,#a855f7)",
                  padding: "12px 14px"
                }}>
                  <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {hospital.type} Hospital
                  </div>
                  <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "#fff", marginTop: "2px", lineHeight: 1.3 }}>
                    {hospital.name}
                  </div>
                </div>
                <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "7px" }}>
                  {[
                    { icon: "📍", label: "District",  value: hospital.district,                               color: "#94a3b8" },
                    { icon: "🏥", label: "Specialty", value: hospital.specialty,                              color: "#94a3b8" },
                    { icon: "🛏", label: "Beds",      value: hospital.beds.toLocaleString(),                  color: "#4ade80" },
                    { icon: "🗺", label: "Coords",    value: `${hospital.lat.toFixed(4)}°N, ${hospital.lng.toFixed(4)}°E`, color: "#64748b" },
                  ].map(row => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>{row.icon} {row.label}</span>
                      <span style={{ fontSize: "0.72rem", color: row.color, fontWeight: 600, textAlign: "right" }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}