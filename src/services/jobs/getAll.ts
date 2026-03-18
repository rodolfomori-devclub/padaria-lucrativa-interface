import { api } from "~/lib/axios";

export const getAllJobs = async () => {
  const { data } = await api.get("/jobs");
  return data;
};
