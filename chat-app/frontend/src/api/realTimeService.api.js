import api from "./axios";

export const checkRealtimeStatus = () =>
  api.get("/realtime/health");