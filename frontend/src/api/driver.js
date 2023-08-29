import axios from "./axios";

export const getDriversRequest = () => axios.get("/driver");
export const getDriverRequest = (id) => axios.get("/driver/" + id);

export const getDriversVehicleRequest = () => axios.get("/drivervehicle");
export const getDriverVehicleRequest = (id) =>
  axios.get("/drivervehicle/" + id);
export const createDriverRequest = (driver) => axios.post("/driver", driver);
export const updateDriverRequest = (id, driver) =>
  axios.put("/driver/" + id, driver);
