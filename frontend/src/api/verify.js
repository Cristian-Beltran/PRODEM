import axios from "./axios";

export const getVerifysRequest = () => axios.get("/verifyVehicle");
export const getVerifyRequest = (id) => axios.get("/verifyVehicle/" + id);
export const createVerifyRequest = (verify) =>
  axios.post("/verifyVehicle", verify);
export const updateVerifyRequest = (id, verify) =>
  axios.put("/verifyVehicle/" + id, verify);
export const getVerifysDriverRequest = () => axios.get("/verifyVehicleDriver");
export const createVerifyDriverRequest = (verify) =>
  axios.post("/verifyVehicleDriver", verify);
