import axios from "./axios";

export const getFuelingsRequest = () => axios.get("/fueling");
export const getFuelingRequest = (id) => axios.get("/fueling/" + id);

export const createFuelingRequest = (fueling) =>
  axios.post("/fueling", fueling);

export const updateFuelingRequest = (id, fueling) =>
  axios.put("/fueling/" + id, fueling);

export const getFuelingsByVehicleRequest = (id, query) =>
  axios.get("/fueling/vehicle/" + id + "/?" + query);

export const getFuelingsByDriverRequest = (query) =>
  axios.get("/fuelingDriver/?" + query);

export const createFuelingDriverRequest = (fueling) =>
  axios.post("/fuelingDriver", fueling);
