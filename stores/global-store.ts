import { create } from "zustand";

interface StoreState {
  role: string;
  setRole: (arg: string) => void;
}

export const useGlobalStore = create<StoreState>()((set) => ({
  role: "",
  setRole: (arg) => set({ role: arg }),
}));
