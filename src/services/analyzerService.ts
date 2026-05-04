import { postForm, postJson } from "@/services/http";
import type { AnalyzerResponse } from "@/types/analyzer";

export const analyzeSchema = (formData: FormData, token: string) =>
  postForm<AnalyzerResponse>("/api/analyzer/analyze", formData, token);

export const refineAnalysis = (
  originalSchema: string,
  selectedFixes: string[],
  normalizationLevel: string,
  token: string
) =>
  postJson<AnalyzerResponse>(
    "/api/analyzer/refine",
    {
      schema: originalSchema,
      fixes: selectedFixes,
      level: normalizationLevel,
    },
    token
  );
