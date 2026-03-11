import type { User } from "~/types/user";
import { api } from "~/lib/axios";

export const completeTutorials = async (): Promise<User> => {
  const response = await api.post<User>("/auth/complete-tutorials");
  return response.data;
};
