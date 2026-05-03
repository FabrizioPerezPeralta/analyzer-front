import UploadPanel from "@/components/analyzer/UploadPanel";
import SplitPaneViewer from "@/components/analyzer/SplitPaneViewer";
import { useAnalyzerStore } from "@/store/analyzerStore";

const Dashboard = () => {
  const result = useAnalyzerStore((state) => state.result);
  const isLoading = useAnalyzerStore((state) => state.isLoading);

  return (
    <div className="relative px-6 py-8">
      {result ? <SplitPaneViewer /> : <UploadPanel />}
      {isLoading ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-canvas/80 backdrop-blur">
          <div className="flex flex-col items-center gap-3 rounded-lg border border-hairline bg-canvas px-8 py-6 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
            <p className="text-[21px] font-semibold tracking-[0.231px]">
              Analyzing schema
            </p>
            <p className="text-[14px] text-ink-muted-48">
              DeepSeek is reviewing your input. This can take a few moments.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
