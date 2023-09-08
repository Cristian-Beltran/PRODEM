import axios from "./axios";

// Admin
export const getVehiclesRequest = () => axios.get("/vehicle");
export const getVehicleRequest = (id) => axios.get("/vehicle/" + id);
export const createVehicleRequest = (vehicle) =>
  axios.post("/vehicle", vehicle);
export const updateVehicleRequest = (id, vehicle) =>
  axios.put("/vehicle/" + id, vehicle);
export const uploadVehicleRequest = (id, vehicle) =>
  axios.post("/vehicle/photo/" + id, vehicle, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Driver
export const getDriverVehicleRequest = () => axios.get("/vehicleDriver");
