import { Plus } from "lucide-react";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

type ExercisePickerProps = {
  exerciseOptions: string[];
  selectedExercise: string;
  customExercise: string;
  onSelectExercise: (exerciseName: string) => void;
  onCustomExerciseChange: (exerciseName: string) => void;
  onAddExercise: (exerciseName: string) => void;
};

const ExercisePicker = ({
  exerciseOptions,
  selectedExercise,
  customExercise,
  onSelectExercise,
  onCustomExerciseChange,
  onAddExercise,
}: ExercisePickerProps) => {
  return (
    <section aria-labelledby="exercise-heading" className="space-y-3">
      <p
        id="exercise-heading"
        className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground"
      >
        Вправа
      </p>

      <div className="grid grid-cols-2 gap-2">
        {exerciseOptions.map((exerciseName) => (
          <Button
            key={exerciseName}
            type="button"
            variant="outline"
            onClick={() => onSelectExercise(exerciseName)}
            aria-pressed={selectedExercise === exerciseName}
            className={`h-11 justify-start border-border px-3 text-left text-base ${
              selectedExercise === exerciseName
                ? "border-emerald-400 bg-emerald-500/25 text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.45)] ring-2 ring-emerald-400/70 hover:bg-emerald-500/30 hover:text-emerald-50"
                : "bg-background/70 text-foreground hover:bg-muted"
            }`}
          >
            {exerciseName}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-2">
        <Input
          value={customExercise}
          onChange={(event) => onCustomExerciseChange(event.target.value)}
          placeholder="Своя вправа..."
          aria-label="Custom exercise name"
          className="h-11 border-border bg-background/70"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => onAddExercise(customExercise)}
          disabled={!customExercise.trim()}
          className="h-11 border-border bg-background/70 px-4 text-sm font-semibold text-foreground hover:bg-muted"
          aria-label="Add custom exercise"
        >
          <Plus className="size-4" aria-hidden="true" />
          Додати
        </Button>
      </div>
    </section>
  );
};

export default ExercisePicker;
