import { useMemo, useState } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import type { Edge, Node } from "reactflow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ReactFlowNodeData, ReactFlowPayload } from "@/types/analyzer";

interface DiagramPanelProps {
  reactFlow: ReactFlowPayload | null | undefined;
  generatedReport: string;
}

const DiagramPanel = ({ reactFlow, generatedReport }: DiagramPanelProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nodes = useMemo<Node<ReactFlowNodeData>[]>(
    () =>
      (reactFlow?.nodes ?? []).map((node) => ({
        ...node,
        data: node.data ?? {},
      })),
    [reactFlow?.nodes]
  );
  const edges = useMemo<Edge[]>(() => reactFlow?.edges ?? [], [reactFlow?.edges]);
  const hasDiagram = nodes.length > 0 || edges.length > 0;

  return (
    <div className="flex h-full flex-col gap-6 overflow-auto">
      <Card className="border-hairline p-6">
        <div className="flex items-center justify-between">
          <p className="text-[21px] font-semibold tracking-[0.231px]">ER Diagram</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            disabled={!hasDiagram}
          >
            View fullscreen
          </Button>
        </div>
        <div className="mt-6 h-[360px] overflow-hidden rounded-md border border-hairline bg-parchment">
          {hasDiagram ? (
            <ReactFlow nodes={nodes} edges={edges} fitView>
              <MiniMap />
              <Controls />
              <Background gap={16} size={1} color="#e0e0e0" />
            </ReactFlow>
          ) : (
            <div className="flex h-full items-center justify-center text-[14px] text-ink-muted">
              No diagram provided.
            </div>
          )}
        </div>
      </Card>
      {generatedReport ? (
        <Card className="border-hairline p-6">
          <p className="text-[21px] font-semibold tracking-[0.231px]">
            Generated SQL
          </p>
          <pre className="mt-4 whitespace-pre-wrap rounded-md bg-parchment p-4 text-[12px] text-ink-muted">
            {generatedReport}
          </pre>
        </Card>
      ) : null}
      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6 py-10 backdrop-blur">
          <div className="flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-lg border border-hairline bg-canvas">
            <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
              <div>
                <p className="text-[21px] font-semibold tracking-[0.231px]">
                  ER Diagram
                </p>
                <p className="text-[12px] text-ink-muted-48">
                  Pan, zoom, and inspect relationships.
                </p>
              </div>
              <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </div>
            <div className="flex-1 bg-parchment">
              <ReactFlow nodes={nodes} edges={edges} fitView>
                <MiniMap />
                <Controls />
                <Background gap={16} size={1} color="#e0e0e0" />
              </ReactFlow>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DiagramPanel;
