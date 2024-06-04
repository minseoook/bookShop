import { httpClient } from "./http";

type data = {
  email: string;
  password: string;
};
export const register = async (user: data) => {
  const response = await httpClient.post("/users/join", user);
  return response.data;
};

export const login = async (user: data) => {
  const response = await httpClient.post("/users/login", user);
  return response.data;
};
export const checkEmail = async (email: { email: string }) => {
  const response = await httpClient.post("/users/checkEmail", email);
  return response.data;
};
export const refresh = async () => {
  const response = await httpClient.post("/users/refresh");
  return response.data;
};

export const logout = async () => {
  const response = await httpClient.post("users/logout");
  return response.data;
};
