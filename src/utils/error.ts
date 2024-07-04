import { AxiosError } from "axios";

export const isNetworkError = (error: AxiosError) => {
  return !error.response && error.message === "Network Error";
};

export const isTimeoutError = (error: AxiosError) => {
  return error.code === "ECONNABORTED";
};
export const isServerError = (error: AxiosError) => {
  return error.response && error.response.status >= 500;
};

export const isTokenError = (error: AxiosError) => {
  return error.response && error.response.status === 401;
};

export const isAuthorityError = (error: AxiosError) => {
  return error.response && error.response.status === 403;
};

export const isNotFoundError = (error: AxiosError) => {
  return error.response && error.response.status === 404;
};

export const isConflictError = (error: AxiosError) => {
  return error.response && error.response.status === 409;
};
