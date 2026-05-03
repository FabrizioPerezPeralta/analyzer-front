import { create } from "zustand";
import type { AnalyzerResponse } from "@/types/analyzer";

interface AnalyzerState {
  text: string;
  file: File | null;
  result: AnalyzerResponse | null;
  selectedObservationIds: string[];
  generatedReport: string;
  isLoading: boolean;
  error: string | null;
  setText: (text: string) => void;
  setFile: (file: File | null) => void;
  setResult: (result: AnalyzerResponse | null) => void;
  setGeneratedReport: (report: string) => void;
  toggleObservation: (id: string) => void;
  clearSelections: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useAnalyzerStore = create<AnalyzerState>((set) => ({
  text: "",
  file: null,
  result: null,
  selectedObservationIds: [],
  generatedReport: "",
  isLoading: false,
  error: null,
  setText: (text) => set({ text }),
  setFile: (file) => set({ file }),
  setResult: (result) => set({ result }),
  setGeneratedReport: (generatedReport) => set({ generatedReport }),
  toggleObservation: (id) =>
    set((state) => ({
      selectedObservationIds: state.selectedObservationIds.includes(id)
        ? state.selectedObservationIds.filter((item) => item !== id)
        : [...state.selectedObservationIds, id],
    })),
  clearSelections: () => set({ selectedObservationIds: [] }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      text: "",
      file: null,
      result: null,
      selectedObservationIds: [],
      generatedReport: "",
      isLoading: false,
      error: null,
    }),
}));
