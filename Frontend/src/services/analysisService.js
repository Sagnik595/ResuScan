import api from "./axiosInstance";

export const analyzeResume = async (jid, rid) => {
  const { data } = await api.post("/report/analyze", {
    jid,
    rid,
  });

  return data;
};