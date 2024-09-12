import {
  changeProfile,
  checkDuplicateEmail,
  checkDuplicateNickname,
  checkPassword,
  login,
  logout,
  signup
} from "@/api/auth.api";
import {
  ICheckDuplicateEmail,
  ICheckDuplicateNickname,
  ILogin,
  IResetPassword,
  ISignup
} from "@/models/auth.model";
import { useAuthStore } from "@/store/authStore";
import {
  isBadRequestError,
  isConflictError,
  isTokenError
} from "@/utils/error";
import { removeLocalStorage } from "@/utils/localStorage";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TOAST_MESSAGE = {
  signup: {
    success: "회원가입 성공",
    error: "회원가입 실패"
  },
  login: {
    success: "로그인 성공",
    error: "로그인 실패"
  },
  logout: {
    success: "로그아웃 성공",
    error: "로그아웃 실패"
  },
  changeProfile: {
    success: "프로필 변경 성공",
    error: "프로필 변경 실패"
  }
};

const useAuth = () => {
  const navigate = useNavigate();
  const { storeLogin, storeLogout } = useAuthStore();
  const { showBoundary } = useErrorBoundary();
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [isError, setError] = useState<AxiosError | null>(null);
  const [isEmailError, setIsEmailError] = useState<AxiosError | null>(null);
  const [isNicknameError, setIsNicknameError] = useState<AxiosError | null>(
    null
  );

  const userSignup = (formData: ISignup) => {
    signup(formData)
      .then(() => {
        navigate("/login");
        toast.success(TOAST_MESSAGE.signup.success);
      })
      .catch((err) => {
        if (isConflictError(err) || isBadRequestError(err)) {
          setError(err);
        } else {
          showBoundary(err);
          toast.error(TOAST_MESSAGE.signup.error);
        }
      });
  };

  const userLogin = (formData: ILogin) => {
    login(formData)
      .then(() => {
        storeLogin();
        navigate("/");
        removeLocalStorage("provider");
        toast.success(TOAST_MESSAGE.login.success);
      })
      .catch((err) => {
        if (isTokenError(err) || isBadRequestError(err)) {
          setError(err);
        } else {
          showBoundary(err);
          toast.error(TOAST_MESSAGE.login.error);
        }
      });
  };

  const userLogout = () => {
    logout()
      .then(() => {
        storeLogout();
        navigate("/login");
        toast.success(TOAST_MESSAGE.logout.success);
      })
      .catch((err) => {
        showBoundary(err);
        toast.success(TOAST_MESSAGE.logout.error);
      });
  };

  const userCheckDuplicateEmail = (formData: ICheckDuplicateEmail) => {
    checkDuplicateEmail(formData)
      .then(() => {
        setIsEmailError(null);
      })
      .catch((err) => {
        if (isConflictError(err) || isBadRequestError(err)) {
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
        if (isConflictError(err) || isBadRequestError(err)) {
          setIsNicknameError(err);
        } else {
          showBoundary(err);
        }
      });
  };

  const userCheckPassword = useCallback(
    (formData: IResetPassword) => {
      checkPassword(formData)
        .then(() => {
          setSuccess(true);
          // navigate("/profile");
        })
        .catch((err) => {
          if (isBadRequestError(err)) {
            setError(err);
          } else {
            showBoundary(err);
          }
        });
    },
    [showBoundary]
  );

  const userChangeProfile = (formdata: FormData) => {
    changeProfile(formdata)
      .then(() => {
        setError(null);
        toast.success(TOAST_MESSAGE.changeProfile.success);
      })
      .catch((err) => {
        if (isConflictError(err) || isBadRequestError(err)) {
          setError(err);
        } else {
          showBoundary(err);
          toast.error(TOAST_MESSAGE.changeProfile.error);
        }
      });
  };

  return {
    userSignup,
    userLogin,
    userLogout,
    userCheckDuplicateEmail,
    userCheckDuplicateNickname,
    userCheckPassword,
    userChangeProfile,
    isSuccess,
    isError,
    isEmailError,
    isNicknameError
  };
};

export default useAuth;
