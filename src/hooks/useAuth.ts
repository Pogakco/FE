import {
  login,
  logout,
  signup,
  checkDuplicateEmail,
  checkDuplicateNickname,
  getProfile
} from "@/api/auth.api";
import {
  ILogin,
  ISignup,
  ICheckDuplicateEmail,
  ICheckDuplicateNickname,
  IProfile
} from "@/models/auth.model";
import { useAuthStore } from "@/store/authStore";
import { isConflictError, isTokenError } from "@/utils/error";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const { storeLogin, storeLogout } = useAuthStore();
  const { showBoundary } = useErrorBoundary();
  const [isError, setError] = useState<AxiosError | null>(null);
  const [isEmailError, setIsEmailError] = useState<AxiosError | null>(null);
  const [isNicknameError, setIsNicknameError] = useState<AxiosError | null>(
    null
  );
  const [profile, setProfile] = useState<IProfile | null>(null);

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

  const userCheckDuplicateEmail = (formData: ICheckDuplicateEmail) => {
    checkDuplicateEmail(formData)
      .then(() => {
        setIsEmailError(null);
      })
      .catch((err) => {
        if (isConflictError(err)) {
          setIsEmailError(err);
        } else {
          showBoundary(err);
        }
      });
  };

  const userCheckDuplicateNickname = (formData: ICheckDuplicateNickname) => {
    checkDuplicateNickname(formData)
      .then(() => {
        setIsNicknameError(null);
      })
      .catch((err) => {
        if (isConflictError(err)) {
          setIsNicknameError(err);
        } else {
          showBoundary(err);
        }
      });
  };

  const userProfile = useCallback(() => {
    getProfile()
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => {
        showBoundary(err);
      });
  }, [showBoundary]);

  return {
    userSignup,
    userLogin,
    userLogout,
    userCheckDuplicateEmail,
    userCheckDuplicateNickname,
    userProfile,
    profile,
    isError,
    isEmailError,
    isNicknameError
  };
};

export default useAuth;
