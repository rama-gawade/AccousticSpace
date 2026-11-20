


import api from "./api";

export const uploadAudio = async (formData: FormData) => {
  const response = await api.post("/upload", formData);
  return response.data;
};