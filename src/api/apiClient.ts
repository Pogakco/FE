import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "http://127.0.0.1:3000";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "content-type": "application/json",
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        const status = error.response.status;
        const errorMessage = error.response.data.message;
        
        switch (status) {
          case 401:
            console.error(`${errorMessage}`);
            window.location.href = "/login";
            // 에러 처리
            break;
          case 403:
            console.error(`${errorMessage}`);
            // 에러 처리
            break;
        }
      } else {
        console.error('통신 중 문제 발생');
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const httpClient = createClient();

type RequestMethod = "get" | "post" | "put" | "delete";
export const requestHandler = async <T>(method:RequestMethod, url : string, 
  payload?: T) => {
  let response;

  switch(method) {
    case "post" :
      response = await httpClient.post(url, payload)
      break;
    case "get" :
      response = await httpClient.get(url)
      break;
    case "put" :
      response = await httpClient.put(url, payload);
      break;
    case "delete" :
      response = await httpClient.delete(url);
      break;
  }
  return response.data;
}