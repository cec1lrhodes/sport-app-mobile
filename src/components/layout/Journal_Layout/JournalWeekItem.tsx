import { ChevronDown, ChevronLeft } from "lucide-react";

import type {
  TrainingDay,
  TrainingExercise,
} from "@/components/layout/CreateLoop_Layout/loop_utils/createLoopTypes";
import { cn } from "@/lib/utils";

import type { JournalWeek } from "./journalTypes";
import { trainingDays } from "./journalUtils";
import JournalTrainingDayButton from "./JournalTrainingDayButton";

type JournalWeekItemProps = {
  weekGroup: JournalWeek;
  isOpen: boolean;
  onToggleWeek: (week: number) => void;
  onOpenTraining: (
    week: number,
    day: TrainingDay,
    exercises: TrainingExercise[],
  ) => void;
};

const JournalWeekItem = ({
  weekGroup,
  isOpen,
  onToggleWeek,
  onOpenTraining,
}: JournalWeekItemProps) => {
  const handleToggleWeek = () => {
    onToggleWeek(weekGroup.week);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background/70">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-2 text-left text-lg font-semibold italic transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={handleToggleWeek}
        aria-expanded={isOpen}
        aria-controls={`journal-week-${weekGroup.week}`}
      >
        <span>Week {weekGroup.week}</span>
        {isOpen ? (
          <ChevronDown className="h-5 w-5" aria-hidden="true" />
        ) : (
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      <div
        id={`journal-week-${weekGroup.week}`}
        className={cn(
          "grid transition-all duration-300 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-3 border-t border-border p-3">
            {trainingDays.map((day) => (
              <JournalTrainingDayButton
                key={day}
                week={weekGroup.week}
                day={day}
                exercises={weekGroup.days[day]}
                onOpenTraining={onOpenTraining}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalWeekItem;
