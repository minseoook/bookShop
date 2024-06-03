import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  isloggedIn: boolean;
  token: string;
  loginAction: (token: string) => void;
  logoutAction: () => void;
}

export const useAuthStore = create(
  persist<StoreState>(
    (set) => ({
      isloggedIn: false,
      token: "",
      loginAction: (token: string) => {
        set({ isloggedIn: true });
        set({ token: token });
      },
      logoutAction: () => {
        set({ isloggedIn: false });
        set({ token: "" });
      },
    }),
    { name: "auth" }
  )
);
