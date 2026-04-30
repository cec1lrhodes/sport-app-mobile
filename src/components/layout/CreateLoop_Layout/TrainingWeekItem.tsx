import { ChevronDown, ChevronLeft } from "lucide-react";

import TrainingDayRow from "./TrainingDayRow";
import {
  trainingDays,
  type TrainingWeekGroup,
} from "./loop_utils/trainingListUtils";

type TrainingWeekItemProps = {
  weekGroup: TrainingWeekGroup;
  isOpen: boolean;
  onToggleWeek: (week: number) => void;
  onRemoveExercise: (exerciseId: number) => void;
};

const TrainingWeekItem = ({
  weekGroup,
  isOpen,
  onToggleWeek,
  onRemoveExercise,
}: TrainingWeekItemProps) => {
  const handleToggleWeek = () => {
    onToggleWeek(weekGroup.week);
  };

  return (
    <div className="rounded-xl border border-border bg-background/70 text-sm font-medium leading-6">
      <button
        type="button"
        className="flex w-full items-center justify-between px-3 py-2 text-left transition-colors hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        onClick={handleToggleWeek}
        aria-expanded={isOpen}
        aria-controls={`week-${weekGroup.week}-training`}
      >
        <span>Week {weekGroup.week}</span>
        <span className="text-xs text-muted-foreground">
          {isOpen ? (
            <ChevronDown className="h-5 w-5" aria-hidden="true" />
          ) : (
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          )}
        </span>
      </button>

      {isOpen ? (
        <div
          id={`week-${weekGroup.week}-training`}
          className="flex flex-col gap-2 border-t border-border px-3 py-3"
        >
          {trainingDays.map((day) => (
            <TrainingDayRow
              key={day}
              day={day}
              exercises={weekGroup.days[day]}
              onRemoveExercise={onRemoveExercise}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default TrainingWeekItem;
