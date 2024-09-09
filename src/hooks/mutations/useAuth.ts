import {
  auth,
  checkDuplicateEmail,
  checkDuplicateNickname
} from "@/api/auth.api";
import { IAuth } from "@/models/auth.model";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";

export const useAuth = () => {
  const { storeLogin, storeLogout } = useAuthStore();

  const { mutate } = useMutation<IAuth, Error>({
    mutationFn: auth,
    mutationKey: ["fetchAuth"],
    onSuccess: (data) => {
      if (data.isLogin === true) {
        storeLogin();
      } else {
        storeLogout();
      }
    }
  });

  return {
    mutate
  };
};

export const useDuplicateNickname = () => {
  const { mutate, isSuccess } = useMutation<IAuth, Error, string>({
    mutationFn: (nickname) => checkDuplicateNickname({ nickname })
  });

  return {
    isSuccess,
    mutate
  };
};

export const useDuplicateEmail = () => {
  const { mutate, isSuccess } = useMutation<IAuth, Error, string>({
    mutationFn: (email) => checkDuplicateEmail({ email })
  });

  return {
    isSuccess,
    mutate
  };
};
