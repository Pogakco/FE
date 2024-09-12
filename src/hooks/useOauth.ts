import {
  requestGoogle,
  requestKaKao,
  socialAuth,
  socialSignup
} from "@/api/oauth.api";
import { ISocialSignup, TProvider } from "@/models/oauth.model";
import { useAuthStore } from "@/store/authStore";
import { setLocalStorage } from "@/utils/localStorage";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useRequestKaKao = () => {
  const { mutate } = useMutation<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    Error,
    { code: string; currentUri: string }
  >({
    mutationFn: ({ code, currentUri }) => requestKaKao(code, currentUri)
  });

  return { mutate };
};

export const useRequestGoogle = () => {
  const { mutate } = useMutation<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    Error,
    { code: string; currentUri: string }
  >({
    mutationFn: ({ code, currentUri }) => requestGoogle(code, currentUri)
  });

  return { mutate };
};

export const useSocialLogin = () => {
  /**TODO: auth를 재호출하는 것으로 수정 */
  const { storeLogin } = useAuthStore();
  const navigate = useNavigate();
  const { mutate } = useMutation<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    Error,
    TProvider
  >({
    mutationFn: (provider) => socialAuth(provider),
    onSuccess: async (data, variables) => {
      if (data.isExistingUser) {
        storeLogin();
        setLocalStorage("provider", variables);
        navigate("/", { replace: true });
      } else {
        navigate(`/social-signup?provider=${variables}`, { replace: true });
      }
    }
  });

  return { mutate };
};

export const useSocialSignup = () => {
  /**TODO: auth를 재호출하는 것으로 수정 */
  const { storeLogin } = useAuthStore();
  const navigate = useNavigate();
  const { mutate } = useMutation<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    Error,
    ISocialSignup
  >({
    mutationFn: ({ email, nickname, provider }) =>
      socialSignup(email, nickname, provider),
    onSuccess: (_, variables) => {
      storeLogin();
      setLocalStorage("provider", variables.provider);
      navigate("/");
    }
  });

  return { mutate };
};
