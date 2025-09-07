import api from "./apiConfig";
import axios from "axios";

const axiosClient = axios.create({
  method: "GET",
  baseURL: api.baseUrl,
  headers: {
    // we can add wordpress api key here or nonce to be used in every request
    "Content-tpye": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "text/plain",
  },
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    throw error;
  },
);

export default axiosClient;
