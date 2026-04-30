import { CircleX } from "lucide-react";

import {
  formatExerciseLine,
  type TrainingExercise,
} from "./loop_utils/createLoopTypes";

type TrainingExerciseItemProps = {
  exercise: TrainingExercise;
  onRemoveExercise: (exerciseId: number) => void;
};

const TrainingExerciseItem = ({
  exercise,
  onRemoveExercise,
}: TrainingExerciseItemProps) => {
  const handleRemoveExercise = () => {
    onRemoveExercise(exercise.id);
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <span>{formatExerciseLine(exercise)}</span>
      <button
        type="button"
        className="shrink-0 rounded-full text-muted-foreground transition-all duration-200 ease-out hover:scale-110 hover:text-destructive focus:outline-none focus:ring-2 focus:ring-destructive/50 focus:ring-offset-2 focus:ring-offset-background"
        onClick={handleRemoveExercise}
        aria-label={`Remove ${exercise.name} from training`}
      >
        <CircleX className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
};

export default TrainingExerciseItem;
