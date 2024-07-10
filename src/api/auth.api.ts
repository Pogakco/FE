import {
  ILogin,
  ISignup,
  ICheckDuplicateEmail,
  ICheckDuplicateNickname,
  IResetPassword
} from "@/models/auth.model";
import { httpClient, requestHandler } from "./apiClient";

// auth
export const auth = () => {
  return requestHandler("post", "/auth");
};

// signup
export const signup = (formData: ISignup) => {
  return requestHandler("post", "/signup", formData);
};

// login
export const login = (formData: ILogin) => {
  return requestHandler("post", "/login", formData);
};

// logout
export const logout = () => {
  return requestHandler("post", "/logout");
};

// check email duplicate
export const checkDuplicateEmail = (formData: ICheckDuplicateEmail) => {
  return requestHandler("post", "/check-email", formData);
};

// check nickname duplicate
export const checkDuplicateNickname = (formData: ICheckDuplicateNickname) => {
  return requestHandler("post", "/check-nickname", formData);
};

// check password
export const checkPassword = (formData: IResetPassword) => {
  return requestHandler("post", "/users/me/confirm-password", formData);
};

// my profile
export const getProfile = () => {
  return requestHandler("get", "/users/me");
};

// change profile
export const changeProfile = async (formData: FormData) => {
  const resposne = await httpClient({
    method: "post",
    url: "/users/me",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return resposne.data;
};
