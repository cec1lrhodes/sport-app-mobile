import type {
  TrainingDay,
  TrainingExercise,
} from "@/components/layout/CreateLoop_Layout/loop_utils/createLoopTypes";
import { Card } from "@/ui/card";

import type { JournalWeek } from "./journalTypes";
import JournalWeekItem from "./JournalWeekItem";

type JournalWeekListProps = {
  journalWeeks: JournalWeek[];
  openWeek: number | null;
  onToggleWeek: (week: number) => void;
  onOpenTraining: (
    week: number,
    day: TrainingDay,
    exercises: TrainingExercise[],
  ) => void;
};

const JournalWeekList = ({
  journalWeeks,
  openWeek,
  onToggleWeek,
  onOpenTraining,
}: JournalWeekListProps) => {
  return (
    <Card className="gap-3 border border-border bg-card/90 p-3 shadow-2xl shadow-black/20">
      {journalWeeks.map((weekGroup) => (
        <JournalWeekItem
          key={weekGroup.week}
          weekGroup={weekGroup}
          isOpen={openWeek === weekGroup.week}
          onToggleWeek={onToggleWeek}
          onOpenTraining={onOpenTraining}
        />
      ))}
    </Card>
  );
};

export default JournalWeekList;
