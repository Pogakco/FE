import { ILogin, ISignup } from "@/models/auth.model";
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
