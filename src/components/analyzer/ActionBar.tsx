import { Button } from "@/components/ui/button";

interface ActionBarProps {
  selectedCount: number;
  onGenerate: () => void;
  onReset: () => void;
}

const ActionBar = ({ selectedCount, onGenerate, onReset }: ActionBarProps) => {
  return (
    <div className="flex items-center justify-between border-t border-hairline bg-parchment/90 px-6 py-4 backdrop-blur">
      <div>
        <p className="text-[17px] text-ink">
          {selectedCount} fixes selected
        </p>
        <p className="text-[12px] text-ink-muted-48">
          Use the report generator to merge chosen fixes.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="secondary" onClick={onReset}>
          New analysis
        </Button>
        <Button onClick={onGenerate} disabled={selectedCount === 0}>
          Generate report
        </Button>
      </div>
    </div>
  );
};

export default ActionBar;
