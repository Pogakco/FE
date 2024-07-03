import { login, signup, logout, auth } from "@/api/auth.api";
import { ILogin, ISignup } from "@/models/auth.model";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useCallback, useEffect } from "react";

const useAuth = () => {
  const navigate = useNavigate();
  const { storeLogin, storeLogout } = useAuthStore();

  const userSignup = (formData: ISignup) => {
    signup(formData)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userLogin = (formData: ILogin) => {
    login(formData)
      .then(() => {
        storeLogin();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
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

  const userInitializeAuth = useCallback(() => {
    auth()
      .then((res) => {
        if (res.isLogin === true) {
          storeLogin();
        } else {
          storeLogout();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [storeLogin, storeLogout]);

  /** 최초 1회 실행 */
  useEffect(() => {
    userInitializeAuth();
  }, [userInitializeAuth]);

  return { userSignup, userLogin, userLogout };
};

export default useAuth;
