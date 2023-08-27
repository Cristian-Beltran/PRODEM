import axios from "./axios";

export const getIncidentsRequest = () => axios.get("/incident");
export const getIncidentRequest = (id) => axios.get("/incident/" + id);
export const createIncidentRequest = (incident) => axios.post("/incident", incident);
export const updateIncidentRequest = (id, incident) =>
  axios.put("/incident/" + id, incident);
export const completeIncidentRequest= (id, incident) =>
  axios.put("/incident/complete/" + id, incident);
