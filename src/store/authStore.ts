import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface StoreState {
  isLoggedIn: boolean;
  storeLogin: () => void;
  storeLogout: () => void;
}

// Todo: isLoggedIn 초기값으로 'api/auth' 반환값
export const useAuthStore = create<StoreState>()(
  devtools((set) => ({
    isLoggedIn: false,
    storeLogin: () => {
      set({ isLoggedIn: true });
    },
    storeLogout: () => {
      set({ isLoggedIn: false });
    }
  }))
);
