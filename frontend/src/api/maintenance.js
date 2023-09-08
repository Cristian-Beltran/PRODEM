import axios from "./axios";

export const getMaintenancesRequest = () => axios.get("/maintenance");
export const getMaintenanceRequest = (id) => axios.get("/maintenance/" + id);

export const createMaintenanceRequest = (maintenance) =>
  axios.post("/maintenance", maintenance);

export const updateMaintenanceRequest = (id, maintenance) =>
  axios.put("/maintenance/" + id, maintenance);

export const getMaintenancesByVehicleRequest = (id, query) =>
  axios.get("/maintenance/vehicle/" + id + "/?" + query);

export const getMaintenancesByDriverRequest = (query) =>
  axios.get("/maintenanceDriver/?" + query);

export const createMaintenanceDriverRequest = (maintenance) =>
  axios.post("/maintenanceDriver", maintenance);
