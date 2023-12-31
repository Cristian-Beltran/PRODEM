import axios from "./axios";

export const loginRequest = (user) => axios.post("/login", user);

export const verifyTokenRequest = () => axios.get("/verify");

export const updateProfileRequest = (user) => axios.put("/profile", user);

export const updatePassword = (user) => axios.put("/update/password", user);
