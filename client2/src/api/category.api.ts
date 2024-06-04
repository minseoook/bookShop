import { httpClient } from "./http";

export const getCategory = async () => {
  const response = await httpClient.get("/category");
  return response.data;
};
