import { postForm } from "@/services/http";
import type { AnalyzerResponse } from "@/types/analyzer";

export const analyzeSchema = (formData: FormData, token: string) =>
  postForm<AnalyzerResponse>("/api/analyzer/analyze", formData, token);
