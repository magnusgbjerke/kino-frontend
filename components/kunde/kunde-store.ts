import { components } from "@/lib/schema";
import { create } from "zustand";
export type PlassRequest = components["schemas"]["PlassRequest"];
export type PlassResponse = components["schemas"]["PlassResponse"];

interface StoreState {
  visningnr: string;
  setVisningnr: (arg: string) => void;

  plasser: PlassRequest[];
  setPlasser: (arg: PlassRequest[]) => void;
}

export const useKundeStore = create<StoreState>()((set) => ({
  visningnr: "",
  setVisningnr: (arg) => set({ visningnr: arg }),

  plasser: [],
  setPlasser: (arg) => set({ plasser: arg }),
}));
