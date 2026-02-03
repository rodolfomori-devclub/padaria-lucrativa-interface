import { api } from "~/lib/axios";

export interface CoefficientResponse {
  coefficient: number;
}

export const getCoefficient = async (): Promise<CoefficientResponse> => {
  const { data } = await api.get("/coefficient");
  return data;
};

export const coefficientService = {
  get: getCoefficient,
};
