import axios from "./axios";

export const getRemesasSenderRequest = () => axios.get("/remesa/sender/");
export const getRemesasReceiveRequest = () => axios.get("/remesa/receive/");
export const getRemesasManagerCompleteRequest = () =>
  axios.get("/remesa/manager/complete");
export const getRemesasCompleteRequest = () => axios.get("/remesa/complete");
export const getRemesasIncompleteRequest = () =>
  axios.get("/remesa/incomplete");
export const getRemesaRequest = (id) => axios.get(`/remesa/id/${id}`);
export const createRemesaRequest = () => axios.post("/remesa");
export const deleteRemesaRequest = (id) => axios.delete(`/remesa/${id}`);
export const updateRemesaByAdminRequest = (id, remesa) =>
  axios.put(`/remesa/admin/${id}`, remesa);
export const updateRemesaByManagerRequest = (id, remesa) =>
  axios.put(`/remesa/manager/${id}`, remesa);

export const getRemesasRouteRequest = (id) => axios.get(`/remesa/route/${id}`);

export const generateHashRequest = (id) => axios.get(`/remesa/hash/${id}`);
export const sendRemesaRequest = (hash) => axios.put(`/remesa/send/${hash}`);
export const receiveRemesaRequest = (hash) =>
  axios.put(`/remesa/receive/${hash}`);
