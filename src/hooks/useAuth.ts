import { login, logout, signup } from "@/api/auth.api";
import { ILogin, ISignup } from "@/models/auth.model";
import { useAuthStore } from "@/store/authStore";
import { isConflictError, isTokenError } from "@/utils/error";
import { AxiosError } from "axios";
import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const { storeLogin, storeLogout } = useAuthStore();
  const { showBoundary } = useErrorBoundary();
  const [isError, setError] = useState<AxiosError | null>(null);

  const userSignup = (formData: ISignup) => {
    signup(formData)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        if (isConflictError(err)) {
          setError(err);
        } else {
          showBoundary(err);
        }
      });
  };

  const userLogin = (formData: ILogin) => {
    login(formData)
      .then(() => {
        storeLogin();
        navigate("/");
      })
      .catch((err) => {
        if (isTokenError(err)) {
          setError(err);
        } else {
          showBoundary(err);
        }
      });
  };

  const userLogout = () => {
    logout()
      .then(() => {
        storeLogout();
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { userSignup, userLogin, userLogout, isError };
};

export default useAuth;
