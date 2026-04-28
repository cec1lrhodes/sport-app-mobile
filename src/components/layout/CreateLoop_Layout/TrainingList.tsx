import { useEffect, useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/ui/button";
import { formatExerciseLine, type TrainingExercise } from "./createLoopTypes";

type TrainingListProps = {
  trainingExercises: TrainingExercise[];
  onConfirm: () => void;
};

const TrainingList = ({ trainingExercises, onConfirm }: TrainingListProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

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
          Тренування
        </p>
        <span className="text-xs font-semibold text-muted-foreground">
          {trainingExercises.length} вправ
        </span>
      </div>

      <div className="mt-4 flex min-h-24 flex-col gap-2">
        {trainingExercises.length > 0 ? (
          trainingExercises.map((exercise) => (
            <p
              key={exercise.id}
              className="rounded-xl border border-border bg-background/70 px-3 py-2 text-sm font-medium leading-6"
            >
              {formatExerciseLine(exercise)}
            </p>
          ))
        ) : (
          <p className="rounded-xl border border-dashed border-border px-3 py-6 text-center text-sm text-muted-foreground">
            Додай першу вправу до тренування
          </p>
        )}
      </div>

      <Button
        type="button"
        onClick={handleConfirm}
        disabled={trainingExercises.length === 0 && !isConfirmed}
        className={`relative mt-4 h-12 w-full overflow-hidden rounded-xl bg-emerald-400/70 text-base font-semibold text-black hover:bg-emerald-500 ${
          isConfirmed ? "disabled:opacity-100" : ""
        }`}
        aria-label={isConfirmed ? "Program confirmed" : "Confirm created program"}
      >
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isConfirmed ? "-translate-y-3 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          Confirm
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isConfirmed ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
          aria-hidden={!isConfirmed}
        >
          <Check className="size-6" aria-hidden="true" />
        </span>
      </Button>
    </section>
  );
};

export default TrainingList;
