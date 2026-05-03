import { useMemo, useRef, useState } from "react";
import { FileUp, Paperclip, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { analyzeSchema } from "@/services/analyzerService";
import { useAuthStore } from "@/store/authStore";
import { useAnalyzerStore } from "@/store/analyzerStore";

const UploadPanel = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const token = useAuthStore((state) => state.token);
  const {
    text,
    file,
    setText,
    setFile,
    setResult,
    clearSelections,
    setGeneratedReport,
    setLoading,
    isLoading,
    error,
    setError,
  } = useAnalyzerStore();

  const fileLabel = useMemo(() => file?.name ?? "No file selected", [file]);

  const handleFileSelected = (nextFile: File | null) => {
    setFile(nextFile);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!token) {
      setError("Missing authentication token.");
      return;
    }

    if (!text.trim() && !file) {
      setError("Provide a SQL file or notes before analyzing.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      if (text.trim()) {
        formData.append("text", text.trim());
      }
      if (file) {
        formData.append("file", file);
      }

      const response = await analyzeSchema(formData, token);
      clearSelections();
      setGeneratedReport("");
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <Card className="border-hairline p-8">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-[40px] font-semibold leading-tight">
              Upload your schema
            </p>
            <p className="text-[17px] text-ink-muted-48">
              Drag a .sql or .txt file, add optional notes, and start the audit.
            </p>
          </div>
          <div
            className={
              "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-hairline bg-parchment px-6 py-10 text-center transition" +
              (isDragging ? " border-primary bg-canvas" : "")
            }
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragging(false);
              const droppedFile = event.dataTransfer.files?.[0] ?? null;
              if (droppedFile) {
                handleFileSelected(droppedFile);
              }
            }}
          >
            <FileUp className="h-8 w-8 text-ink" />
            <p className="text-[17px]">Drop schema here</p>
            <p className="text-[14px] text-ink-muted-48">
              Accepted: .sql, .txt
            </p>
            <Button
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              Browse files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".sql,.txt"
              className="hidden"
              onChange={(event) =>
                handleFileSelected(event.target.files?.[0] ?? null)
              }
            />
          </div>
          <div className="flex items-center gap-3 text-[14px] text-ink-muted-48">
            <Paperclip className="h-4 w-4" />
            <span>{fileLabel}</span>
          </div>
          <div className="space-y-3">
            <label className="text-[14px] text-ink-muted-48">
              Optional notes or prompt
            </label>
            <Textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Share constraints, context, or focus areas."
            />
          </div>
          {error ? <p className="text-[14px] text-primary">{error}</p> : null}
          <div className="flex items-center gap-4">
            <Button onClick={handleAnalyze} disabled={isLoading}>
              <Sparkles className="h-4 w-4" />
              {isLoading ? "Analyzing..." : "Analyze"}
            </Button>
            <span className="text-[14px] text-ink-muted-48">
              Results render as observations + ER diagram.
            </span>
          </div>
          {isLoading ? (
            <div className="space-y-4 rounded-lg border border-hairline bg-parchment p-4">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                <div>
                  <p className="text-[17px]">Analyzing your schema</p>
                  <p className="text-[12px] text-ink-muted-48">
                    We will transition to the split view automatically.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-80" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
};

export default UploadPanel;
