// Tamil Nadu Hospitals - District-wise with exact GPS coordinates
export const HOSPITALS = [
  // Chennai
  { id: 1, name: "Rajiv Gandhi Government General Hospital", district: "Chennai", type: "Government", beds: 2314, lat: 13.0827, lng: 80.2707, specialty: "Multi-specialty" },
  { id: 2, name: "Government Stanley Medical College Hospital", district: "Chennai", type: "Government", beds: 1500, lat: 13.1018, lng: 80.2883, specialty: "Multi-specialty" },
  { id: 3, name: "Apollo Hospitals (Greams Road)", district: "Chennai", type: "Private", beds: 700, lat: 13.0569, lng: 80.2542, specialty: "Super-specialty" },
  { id: 4, name: "MIOT International", district: "Chennai", type: "Private", beds: 1000, lat: 13.0135, lng: 80.1800, specialty: "Orthopaedics" },

  // Coimbatore
  { id: 5, name: "Coimbatore Medical College Hospital", district: "Coimbatore", type: "Government", beds: 1100, lat: 11.0168, lng: 76.9558, specialty: "Multi-specialty" },
  { id: 6, name: "PSG Hospitals", district: "Coimbatore", type: "Private", beds: 800, lat: 11.0300, lng: 77.0050, specialty: "Super-specialty" },
  { id: 7, name: "Ganga Hospital", district: "Coimbatore", type: "Private", beds: 500, lat: 11.0099, lng: 76.9812, specialty: "Orthopaedics" },

  // Madurai
  { id: 8, name: "Government Rajaji Hospital", district: "Madurai", type: "Government", beds: 2032, lat: 9.9192, lng: 78.1203, specialty: "Multi-specialty" },
  { id: 9, name: "Velammal Medical College Hospital", district: "Madurai", type: "Private", beds: 700, lat: 9.9600, lng: 78.0700, specialty: "Super-specialty" },

  // Salem
  { id: 10, name: "Salem Government Hospital", district: "Salem", type: "Government", beds: 960, lat: 11.6544, lng: 78.1360, specialty: "Multi-specialty" },
  { id: 11, name: "SKS Hospital", district: "Salem", type: "Private", beds: 350, lat: 11.6680, lng: 78.1528, specialty: "Multi-specialty" },

  // Tiruchirappalli
  { id: 12, name: "Mahatma Gandhi Memorial Government Hospital", district: "Tiruchirappalli", type: "Government", beds: 1200, lat: 10.8050, lng: 78.6856, specialty: "Multi-specialty" },
  { id: 13, name: "Kavery Medical Centre", district: "Tiruchirappalli", type: "Private", beds: 300, lat: 10.8174, lng: 78.6901, specialty: "Cardiology" },

  // Tirunelveli
  { id: 14, name: "Tirunelveli Medical College Hospital", district: "Tirunelveli", type: "Government", beds: 1085, lat: 8.7230, lng: 77.6920, specialty: "Multi-specialty" },
  { id: 15, name: "Tirunelveli District HQ Hospital", district: "Tirunelveli", type: "Government", beds: 500, lat: 8.7139, lng: 77.7567, specialty: "General" },

  // Vellore
  { id: 16, name: "Christian Medical College (CMC)", district: "Vellore", type: "Private", beds: 2700, lat: 12.9165, lng: 79.1325, specialty: "Super-specialty" },
  { id: 17, name: "Government Vellore Medical College Hospital", district: "Vellore", type: "Government", beds: 800, lat: 12.9249, lng: 79.1367, specialty: "Multi-specialty" },

  // Erode
  { id: 18, name: "Erode Government Hospital", district: "Erode", type: "Government", beds: 600, lat: 11.3410, lng: 77.7172, specialty: "General" },
  { id: 19, name: "SRIHER Erode Campus", district: "Erode", type: "Private", beds: 400, lat: 11.3700, lng: 77.7300, specialty: "Multi-specialty" },

  // Dindigul
  { id: 20, name: "Dindigul Government Hospital", district: "Dindigul", type: "Government", beds: 500, lat: 10.3676, lng: 77.9803, specialty: "General" },
  { id: 21, name: "Sri Gokulam Hospital Dindigul", district: "Dindigul", type: "Private", beds: 200, lat: 10.3724, lng: 77.9831, specialty: "Multi-specialty" },

  // Thanjavur
  { id: 22, name: "Thanjavur Medical College Hospital", district: "Thanjavur", type: "Government", beds: 1654, lat: 10.7860, lng: 79.1378, specialty: "Multi-specialty" },
  { id: 23, name: "Vijay Hospitals Thanjavur", district: "Thanjavur", type: "Private", beds: 250, lat: 10.7899, lng: 79.1420, specialty: "General" },
];

export const DISTRICTS = [...new Set(HOSPITALS.map(h => h.district))];

export const getHospitalsByDistrict = (district) =>
  HOSPITALS.filter(h => h.district === district);

export const DISTRICT_COORDS = {
  Chennai:         { lat: 13.0827, lng: 80.2707, score: 85 },
  Coimbatore:      { lat: 11.0168, lng: 76.9558, score: 72 },
  Madurai:         { lat: 9.9252,  lng: 78.1198, score: 61 },
  Salem:           { lat: 11.6544, lng: 78.1360, score: 45 },
  Tiruchirappalli: { lat: 10.7905, lng: 78.7047, score: 55 },
  Tirunelveli:     { lat: 8.7139,  lng: 77.7567, score: 38 },
  Vellore:         { lat: 12.9165, lng: 79.1325, score: 50 },
  Erode:           { lat: 11.3410, lng: 77.7172, score: 68 },
  Dindigul:        { lat: 10.3676, lng: 77.9803, score: 42 },
  Thanjavur:       { lat: 10.7860, lng: 79.1378, score: 77 },
};
