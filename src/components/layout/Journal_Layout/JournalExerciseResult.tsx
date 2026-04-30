import {
  formatExerciseLine,
  type TrainingExercise,
} from "@/components/layout/CreateLoop_Layout/loop_utils/createLoopTypes";
import { Input } from "@/ui/input";

type JournalExerciseResultProps = {
  exercise: TrainingExercise;
  setResults: Record<string, string>;
  onSetResultChange: (resultKey: string, value: string) => void;
};

const JournalExerciseResult = ({
  exercise,
  setResults,
  onSetResultChange,
}: JournalExerciseResultProps) => {
  return (
    <div className="space-y-3">
      <p className="font-semibold">{formatExerciseLine(exercise)}</p>

      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: exercise.sets }, (_, index) => {
          const setNumber = index + 1;
          const resultKey = `${exercise.id}-${setNumber}`;

          return (
            <label
              key={resultKey}
              className="space-y-1 text-xs font-semibold text-muted-foreground"
            >
              <span>{setNumber}.</span>
              <Input
                value={setResults[resultKey] ?? ""}
                onChange={(event) =>
                  onSetResultChange(resultKey, event.target.value)
                }
                inputMode="numeric"
                aria-label={`${exercise.name} set ${setNumber} result`}
                className="h-10 bg-background/70 text-center text-sm"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default JournalExerciseResult;
