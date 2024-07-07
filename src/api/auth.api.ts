import {
  ILogin,
  ISignup,
  ICheckDuplicateEmail,
  ICheckDuplicateNickname
} from "@/models/auth.model";
import { requestHandler } from "./apiClient";

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
