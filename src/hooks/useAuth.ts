import {
  login,
  logout,
  signup,
  checkDuplicateEmail,
  checkDuplicateNickname,
  getProfile,
  checkPassword,
  changeProfile
} from "@/api/auth.api";
import {
  ILogin,
  ISignup,
  ICheckDuplicateEmail,
  ICheckDuplicateNickname,
  IResetPassword,
  IProfile
} from "@/models/auth.model";
import { useAuthStore } from "@/store/authStore";
import {
  isConflictError,
  isTokenError,
  isBadRequestError
} from "@/utils/error";
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
        if (isConflictError(err)) {
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
        toast.success(TOAST_MESSAGE.login.success);
      })
      .catch((err) => {
        if (isTokenError(err)) {
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

  const userCheckPassword = useCallback(
    (formData: IResetPassword) => {
      checkPassword(formData)
        .then(() => {
          navigate("/profile");
        })
        .catch((err) => {
          if (isBadRequestError(err)) {
            setError(err);
          } else {
            showBoundary(err);
          }
        });
    },
    [showBoundary, navigate]
  );

  const userChangeProfile = (formdata: FormData) => {
    changeProfile(formdata)
      .then(() => {
        setError(null);
        toast.success(TOAST_MESSAGE.changeProfile.success);
      })
      .catch((err) => {
        if (isConflictError(err)) {
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
    isError,
    isEmailError,
    isNicknameError
  };
};

export default useAuth;
