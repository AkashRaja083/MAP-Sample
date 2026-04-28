import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api"
});

export const fetchGeoJSON = () =>
  API.get("/taluks/geojson");

export const fetchDashboardStats = () =>
  API.get("/dashboard/stats");