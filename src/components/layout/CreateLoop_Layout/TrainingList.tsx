import { useEffect, useMemo, useState } from "react";

import type { TrainingExercise } from "./loop_utils/createLoopTypes";
import TrainingListActions from "./TrainingListActions";
import TrainingWeekItem from "./TrainingWeekItem";
import { buildTrainingWeekGroups } from "./loop_utils/trainingListUtils";

type TrainingListProps = {
  trainingExercises: TrainingExercise[];
  isNameSet: boolean;
  onConfirm: () => void;
  onSetName: () => void;
  onRemoveExercise: (exerciseId: number) => void;
};

const TrainingList = ({
  trainingExercises,
  isNameSet,
  onConfirm,
  onSetName,
  onRemoveExercise,
}: TrainingListProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [openWeeks, setOpenWeeks] = useState<number[]>([]);
  const weekGroups = useMemo(() => {
    return buildTrainingWeekGroups(trainingExercises);
  }, [trainingExercises]);

  useEffect(() => {
    if (!isConfirmed) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsConfirmed(false);
    }, 1200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isConfirmed]);

  const handleToggleWeek = (week: number) => {
    setOpenWeeks((currentWeeks) => {
      if (currentWeeks.includes(week)) {
        return currentWeeks.filter((currentWeek) => currentWeek !== week);
      }

      return [...currentWeeks, week];
    });
  };

  const handleConfirm = () => {
    if (trainingExercises.length === 0) {
      return;
    }

    setIsConfirmed(true);
    onConfirm();
  };

  return (
    <section
      aria-labelledby="training-list-heading"
      className="rounded-2xl border border-border bg-card/90 p-4 shadow-2xl shadow-black/20"
    >
      <div className="flex items-center justify-between gap-3">
        <p
          id="training-list-heading"
          className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground"
        >
          Training
        </p>
        <span className="text-xs font-semibold text-muted-foreground">
          {trainingExercises.length} exercises
        </span>
      </div>

      <div className="mt-4 flex min-h-24 flex-col gap-2">
        {weekGroups.length > 0 ? (
          weekGroups.map((weekGroup) => (
            <TrainingWeekItem
              key={weekGroup.week}
              weekGroup={weekGroup}
              isOpen={openWeeks.includes(weekGroup.week)}
              onToggleWeek={handleToggleWeek}
              onRemoveExercise={onRemoveExercise}
            />
          ))
        ) : (
          <p className="rounded-xl border border-dashed border-border px-3 py-6 text-center text-sm text-muted-foreground">
            Add your first exercise to training
          </p>
        )}
      </div>

      <TrainingListActions
        isNameSet={isNameSet}
        isConfirmed={isConfirmed}
        hasExercises={trainingExercises.length > 0}
        onSetName={onSetName}
        onConfirm={handleConfirm}
      />
    </section>
  );
};

export default TrainingList;
