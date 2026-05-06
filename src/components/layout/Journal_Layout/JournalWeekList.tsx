import type {
  TrainingDay,
  TrainingExercise,
} from "@/components/layout/CreateLoop_Layout/loop_utils/createLoopTypes";
import { Card } from "@/ui/card";

import type { JournalWeek } from "./journal_utils/journalTypes";
import JournalWeekItem from "./JournalWeekItem";

type JournalWeekListProps = {
  loopId: number;
  journalWeeks: JournalWeek[];
  openWeek: number | null;
  setResults: Record<string, string>;
  onToggleWeek: (week: number) => void;
  onOpenTraining: (
    week: number,
    day: TrainingDay,
    exercises: TrainingExercise[],
  ) => void;
};

const JournalWeekList = ({
  loopId,
  journalWeeks,
  openWeek,
  setResults,
  onToggleWeek,
  onOpenTraining,
}: JournalWeekListProps) => {
  return (
    <Card className="gap-3 border border-border bg-card/90 p-3 shadow-2xl shadow-black/20">
      {journalWeeks.map((weekGroup) => (
        <JournalWeekItem
          key={weekGroup.week}
          loopId={loopId}
          weekGroup={weekGroup}
          isOpen={openWeek === weekGroup.week}
          setResults={setResults}
          onToggleWeek={onToggleWeek}
          onOpenTraining={onOpenTraining}
        />
      ))}
    </Card>
  );
};

export default JournalWeekList;
