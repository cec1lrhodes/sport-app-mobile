import type {
  TrainingDay,
  TrainingExercise,
} from "@/components/layout/CreateLoop_Layout/loop_utils/createLoopTypes";
import { cn } from "@/lib/utils";

import { getExercisePreview } from "./journalUtils";

type JournalTrainingDayButtonProps = {
  week: number;
  day: TrainingDay;
  exercises: TrainingExercise[];
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
  onOpenTraining,
}: JournalTrainingDayButtonProps) => {
  const hasExercises = exercises.length > 0;
  const exercisePreview = getExercisePreview(exercises);

  const handleOpenTraining = () => {
    onOpenTraining(week, day, exercises);
  };

  return (
    <button
      type="button"
      className={cn(
        "flex w-full min-w-0 items-center gap-3 rounded-lg border border-border px-3 py-3 text-left text-xl font-semibold transition hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70",
        !hasExercises &&
          "border-dashed text-muted-foreground hover:border-border hover:bg-transparent",
      )}
      onClick={handleOpenTraining}
      aria-label={`Open week ${week} day ${day} training`}
    >
      <span className="shrink-0">{day}.</span>
      {hasExercises ? (
        <span className="min-w-0 truncate text-sm font-medium not-italic text-muted-foreground">
          {exercisePreview}
        </span>
      ) : null}
    </button>
  );
};

export default JournalTrainingDayButton;
