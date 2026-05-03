export type Severity = "Critical" | "High" | "Medium" | "Low" | "Info" | string;

export interface Observation {
  severity: Severity;
  description: string;
  proposedFixSql: string;
}

export interface ReactFlowNodeData {
  label?: string;
}

export interface ReactFlowNode {
  id: string;
  type?: string;
  position: { x: number; y: number };
  data?: ReactFlowNodeData;
}

export interface ReactFlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface ReactFlowPayload {
  nodes: ReactFlowNode[];
  edges: ReactFlowEdge[];
}

export interface AnalyzerResponse {
  detectedDialect: string;
  observations: Observation[];
  reactFlow: ReactFlowPayload;
}
