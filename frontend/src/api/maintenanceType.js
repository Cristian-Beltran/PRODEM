import axios from "./axios";

export const getMaintenanceTypesRequest = () => axios.get("/typeMaintenance");
export const getMaintenanceTypeRequest = (id) =>
  axios.get("/typeMaintenance/" + id);
export const createMaintenanceTypeRequest = (incident) =>
  axios.post("/typeMaintenance", incident);
export const updateMaintenanceTypeRequest = (id, incident) =>
  axios.put("/typeMaintenance/" + id, incident);
