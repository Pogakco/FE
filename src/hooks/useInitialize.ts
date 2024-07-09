import { auth } from "@/api/auth.api";
import { useCallback } from "react";
import { useAuthStore } from "@/store/authStore";

const useInitialize = () => {
  const { storeLogin, storeLogout } = useAuthStore();

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

  return { userInitializeAuth };
};

export default useInitialize;
