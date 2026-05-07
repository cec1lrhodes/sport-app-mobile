import type {
  TrainingDay,
  TrainingExercise,
} from "@/components/layout/CreateLoop_Layout/loop_utils/createLoopTypes";
import { cn } from "@/lib/utils";

import {
  getExercisePreview,
  type JournalTrainingStatus,
} from "./journal_utils/journalUtils";

type JournalTrainingDayButtonProps = {
  week: number;
  day: TrainingDay;
  exercises: TrainingExercise[];
  status: JournalTrainingStatus;
  onOpenTraining: (
    week: number,
    day: TrainingDay,
    exercises: TrainingExercise[],
  ) => void;
};

const JournalTrainingDayButton = ({
  week,
  day,
  exercises,
  status,
  onOpenTraining,
}: JournalTrainingDayButtonProps) => {
  const hasExercises = exercises.length > 0;
  const exercisePreview = getExercisePreview(exercises);
  const isCompleted = status === "completed";
  const hasRepsMismatch = status === "mismatched";

  const handleOpenTraining = () => {
    onOpenTraining(week, day, exercises);
  };

  return (
    <button
      type="button"
      className={cn(
        "flex w-full min-w-0 items-center gap-3 rounded-lg border border-border px-3 py-3 text-left text-xl font-semibold transition hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70",
        isCompleted && "text-green-500",
        hasRepsMismatch && "text-orange-500",
        !hasExercises &&
          "border-dashed text-muted-foreground hover:border-border hover:bg-transparent",
      )}
      onClick={handleOpenTraining}
      aria-label={`Open week ${week} day ${day} training`}
    >
      <span className="shrink-0">{day}.</span>
      {hasExercises ? (
        <span
          className={cn(
            "min-w-0 truncate text-sm font-medium not-italic text-muted-foreground",
            isCompleted && "text-green-500",
            hasRepsMismatch && "text-orange-500",
          )}
        >
          {exercisePreview}
        </span>
      ) : null}
    </button>
  );
};

export default JournalTrainingDayButton;
