import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import type { Observation } from "@/types/analyzer";

interface ObservationItem extends Observation {
  id: string;
}

interface ObservationListProps {
  observations: ObservationItem[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

const ObservationList = ({ observations, selectedIds, onToggle }: ObservationListProps) => {
  return (
    <div className="flex h-full flex-col gap-4 overflow-auto pr-2">
      {observations.map((observation) => {
        const isChecked = selectedIds.includes(observation.id);
        return (
          <div
            key={observation.id}
            className="rounded-lg border border-hairline bg-canvas p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={isChecked}
                  onChange={() => onToggle(observation.id)}
                />
                <div className="space-y-2">
                  <Badge className="text-ink">{observation.severity}</Badge>
                  <p className="text-[17px] text-ink">{observation.description}</p>
                </div>
              </div>
            </div>
            {observation.proposedFixSql ? (
              <pre className="mt-4 overflow-x-auto rounded-md bg-parchment p-3 text-[12px] text-ink-muted">
                {observation.proposedFixSql}
              </pre>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default ObservationList;
