import { create } from "zustand";

interface StoreState {
  visningnr: string;
  setVisningnr: (arg: string) => void;
}

export const useKundeStore = create<StoreState>()((set) => ({
  visningnr: "",
  setVisningnr: (arg) => set({ visningnr: arg }),
}));
