import axios from "./axios";

export const getRouteRequest = (id) => axios.get("/route/id/" + id);
export const getRoutesDriverRequest = () => axios.get("/route/driver");
export const getRoutesCarrierRequest = () => axios.get("/route/carrier");
export const getRoutesCompleteRequest = () => axios.get("/route/complete");
export const getRoutesRequest = () => axios.get("/route");
export const createRouteRequest = (route) => axios.post("/route", route);
export const updateRouteRequest = (id, route) =>
  axios.put("/route/" + id, route);
export const deleteRouteRequest = (id) => axios.delete("/route/" + id);
