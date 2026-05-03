import { useMemo } from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import ActionBar from "@/components/analyzer/ActionBar";
import DiagramPanel from "@/components/analyzer/DiagramPanel";
import ObservationList from "@/components/analyzer/ObservationList";
import { useAnalyzerStore } from "@/store/analyzerStore";
import type { Observation } from "@/types/analyzer";

const severityRank: Record<string, number> = {
  Critical: 0,
  High: 1,
  Medium: 2,
  Low: 3,
  Info: 4,
};

const SplitPaneViewer = () => {
  const {
    result,
    selectedObservationIds,
    toggleObservation,
    setGeneratedReport,
    generatedReport,
    reset,
  } = useAnalyzerStore();

  const observations = useMemo(() => {
    if (!result) {
      return [] as Array<Observation & { id: string }>;
    }

    return result.observations
      .map((observation, index) => ({ ...observation, id: `obs-${index}` }))
      .sort((a, b) => {
        const rankA = severityRank[a.severity] ?? 99;
        const rankB = severityRank[b.severity] ?? 99;
        return rankA - rankB;
      });
  }, [result]);

  const handleGenerate = () => {
    if (!result) {
      return;
    }

    const selected = observations.filter((observation) =>
      selectedObservationIds.includes(observation.id)
    );
    const sql = selected
      .map((observation) => observation.proposedFixSql)
      .filter(Boolean)
      .join("\n\n");

    setGeneratedReport(sql);
    if (sql) {
      void navigator.clipboard.writeText(sql);
    }
  };

  if (!result) {
    return null;
  }

  return (
    <div className="flex h-[calc(100vh-220px)] min-h-[520px] flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[40px] font-semibold leading-tight">Audit results</p>
          <p className="text-[17px] text-ink-muted-48">
            Detected dialect: {result.detectedDialect}
          </p>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col rounded-lg border border-hairline">
        <PanelGroup direction="horizontal" className="min-h-0 flex-1">
          <Panel defaultSize={45} minSize={30}>
            <div className="h-full overflow-hidden p-6">
              <p className="text-[21px] font-semibold tracking-[0.231px]">
                Observations
              </p>
              <p className="mt-1 text-[14px] text-ink-muted-48">
                Select the fixes you want to include.
              </p>
              <div className="mt-6 h-[calc(100%-72px)]">
                <ObservationList
                  observations={observations}
                  selectedIds={selectedObservationIds}
                  onToggle={toggleObservation}
                />
              </div>
            </div>
          </Panel>
          <PanelResizeHandle className="w-px bg-hairline" />
          <Panel defaultSize={55} minSize={40}>
            <div className="h-full overflow-hidden p-6">
              <DiagramPanel
                reactFlow={result.reactFlow}
                generatedReport={generatedReport}
              />
            </div>
          </Panel>
        </PanelGroup>
        <ActionBar
          selectedCount={selectedObservationIds.length}
          onGenerate={handleGenerate}
          onReset={reset}
        />
      </div>
    </div>
  );
};

export default SplitPaneViewer;
