import api from "./axiosInstance";

export const registerUser = async (payload) => {
  const { data } = await api.post("/user/register", payload);
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await api.post("/user/login", payload);
  return data;
};

export const loginAdmin = async (payload) => {
  const { data } = await api.post("/admin/login", payload);
  return data;
};