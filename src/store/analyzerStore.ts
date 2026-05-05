import { create } from "zustand";
import type { AnalyzerResponse, NormalizationLevel } from "@/types/analyzer";

interface AnalyzerState {
  text: string;
  file: File | null;
  normalizationLevel: NormalizationLevel;
  result: AnalyzerResponse | null;
  selectedObservationIds: string[];
  generatedReport: string;
  isLoading: boolean;
  error: string | null;
  setText: (text: string) => void;
  setFile: (file: File | null) => void;
  setNormalizationLevel: (level: NormalizationLevel) => void;
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
  normalizationLevel: "3NF",
  result: null,
  selectedObservationIds: [],
  generatedReport: "",
  isLoading: false,
  error: null,
  setText: (text) => set({ text }),
  setFile: (file) => set({ file }),
  setNormalizationLevel: (normalizationLevel) => set({ normalizationLevel }),
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
      normalizationLevel: "3NF",
      result: null,
      selectedObservationIds: [],
      generatedReport: "",
      isLoading: false,
      error: null,
    }),
}));
