import api from "./api";
import type { HistoryItem } from "../types";

export const getHistory = async () => {
    const response = await api.get("/history");
    return response.data.data;
};

export const deleteHistory = async (id: number) => {
  return api.delete(`/history/${id}`);
};