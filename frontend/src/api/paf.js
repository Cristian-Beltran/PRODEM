import axios from "./axios";

export const getPafsRequest = () => axios.get("/paf");
export const getPafRequest = (id) => axios.get("/paf/" + id);
export const createPafRequest = (paf) => axios.post("/paf", paf);
export const updatePafRequest = (id, paf) => axios.put("/paf/" + id, paf);
