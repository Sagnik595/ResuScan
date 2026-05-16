import api from "./axiosInstance";

// Admin APIs
export const uploadJobDescription = async (payload) => {
  const { data } = await api.post("/admin/jdupload", payload);
  return data;
};

export const parseJobDescription = async (id) => {
  const { data } = await api.post("/admin/jdparse", {
    id,
  });

  return data;
};

export const getAllJobs = async () => {
  const { data } = await api.get("/admin/allJD");
  return data;
};

export const getSingleJob = async (id) => {
  const { data } = await api.post("/admin/singleJD", {
    id,
  });

  return data;
};

export const deleteJob = async (id) => {
  const { data } = await api.delete("/admin/deleteJD", {
    data: { id },
  });

  return data;
};
