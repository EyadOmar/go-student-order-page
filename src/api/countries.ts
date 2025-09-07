import axiosClient from "./axiosClient";

export interface ICountry {
  name: {
    common: string;
  };
}

export async function getCountries(): Promise<ICountry[]> {
  return await axiosClient.get("/all?fields=name");
}
