import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL!,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    // "X-Lang": currentLanguageCode,
  },
  withCredentials: true,
  withXSRFToken: true,
});


