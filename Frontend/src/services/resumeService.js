import api from "./axiosInstance";

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("pdf", file);

  const { data } = await api.post("/user/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const parseResume = async (resumeId) => {
  const { data } = await api.post("/user/parse", {
    resumeId,
  });

  return data;
};