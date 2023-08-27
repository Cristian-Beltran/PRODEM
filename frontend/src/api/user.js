import axios from "./axios";

export const getUsersRequest = (type) => axios.get("/user/" + type);
export const getManagersRequest = () => axios.get("/manager");
export const getUserRequest = (id) => axios.get("/user/id/" + id);
export const createUserRequest = (user) => axios.post("/user", user);
export const changeStatusUserRequest = (id) => axios.put("/user/status/" + id);
export const updateUserRequest = (id, user) => axios.put("/user/" + id, user);
export const udpatePasswordRequest = (id) => axios.put("/user/" + id);
