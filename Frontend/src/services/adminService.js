import api from "./axiosInstance";

export const getAllUsers = async () => {
  const { data } = await api.get("/admin/getusers");
  return data;
};