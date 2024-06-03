import { create } from "zustand";

interface StoreState {
  isloggedIn: boolean;
  token: string;
  loginAction: (token: string) => void;
  logoutAction: () => void;
}

export const useAuthStore = create<StoreState>((set) => ({
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
}));
