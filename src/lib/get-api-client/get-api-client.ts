import axios, { type AxiosInstance } from "axios";

let instance: AxiosInstance | null = null;

export const getAPIClient = () => {
  if (!instance) {
    const apiKey = import.meta.env.VITE_CAT_API_KEY;

    if (!apiKey) {
      console.warn("Warning: No API Key for Cat API found!");
    }

    instance = axios.create({
      baseURL: "https://api.thecatapi.com/v1",
      headers: {
        "X-Api-Key": import.meta.env.VITE_CAT_API_KEY,
      },
    });
  }

  return instance;
};
