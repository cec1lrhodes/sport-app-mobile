import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import { ChevronLeft, Minus, Plus } from "lucide-react";

import { Link } from "@tanstack/react-router";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { useLoopsStore } from "@/store/useLoopsStore";
import exerciseBase from "@/data/exercise_base";

type TrainingExercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

type TrainingMetric = "sets" | "reps" | "weight";

const metricConfig: Record<
  TrainingMetric,
  {
    label: string;
    unit: string;
    min: number;
    step: number;
  }
> = {
  sets: {
    label: "Підходи",
    unit: "sets",
    min: 1,
    step: 1,
  },
  reps: {
    label: "Повтори",
    unit: "reps",
    min: 1,
    step: 1,
  },
  weight: {
    label: "Вага",
    unit: "kg",
    min: 0,
    step: 2.5,
  },
};

const formatExerciseLine = (exercise: TrainingExercise) =>
  `${exercise.name} ${exercise.sets} cycle, ${exercise.reps} reps, ${exercise.weight} kg`;

const CreateLoop = () => {
  const addLoop = useLoopsStore((state) => state.addLoop);
  const handleLoopDraftChange = useLoopsStore(
    (state) => state.handleLoopDraftChange,
  );
  const exerciseOptions = useMemo(
    () => Array.from(new Set(exerciseBase.map((exercise) => exercise.name))),
    [],
  );
  const [selectedExercise, setSelectedExercise] = useState(
    exerciseOptions[0] ?? "",
  );
  const [customExercise, setCustomExercise] = useState("");
  const [trainingExercises, setTrainingExercises] = useState<
    TrainingExercise[]
  >([]);
  const [trainingMetrics, setTrainingMetrics] = useState({
    sets: 3,
    reps: 8,
    weight: 70,
  });

  useEffect(() => {
    handleLoopDraftChange(
      "exercise",
      trainingExercises.map(formatExerciseLine).join("\n"),
    );
    handleLoopDraftChange("repetitions", String(trainingMetrics.reps));
    handleLoopDraftChange("weight", String(trainingMetrics.weight));
  }, [handleLoopDraftChange, trainingExercises, trainingMetrics]);

  const handleMetricChange = (metric: TrainingMetric, direction: 1 | -1) => {
    setTrainingMetrics((currentMetrics) => {
      const config = metricConfig[metric];
      const nextValue = currentMetrics[metric] + config.step * direction;

      return {
        ...currentMetrics,
        [metric]: Math.max(config.min, nextValue),
      };
    });
  };

  const handleSelectExercise = (exerciseName: string) => {
    setSelectedExercise(exerciseName);
  };

  const handleCustomExerciseChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomExercise(event.target.value);
  };

  const handleAddExercise = (exerciseName: string) => {
    const trimmedExerciseName = exerciseName.trim();

    if (!trimmedExerciseName) {
      return;
    }

    setSelectedExercise(trimmedExerciseName);
    setTrainingExercises((currentExercises) => [
      ...currentExercises,
      {
        id: Date.now(),
        name: trimmedExerciseName,
        sets: trainingMetrics.sets,
        reps: trainingMetrics.reps,
        weight: trainingMetrics.weight,
      },
    ]);
    setCustomExercise("");
  };

  return (
    <main className="min-h-screen bg-background px-4 pb-24 pt-6 text-foreground">
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-md flex-col gap-5">
        <header className="flex items-center justify-between">
          <Link
            to="/second"
            aria-label="Back to library"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-accent"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
            Create loop
          </p>
        </header>

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
                onClick={() => handleSelectExercise(exerciseName)}
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
              onChange={handleCustomExerciseChange}
              placeholder="Своя вправа..."
              aria-label="Custom exercise name"
              className="h-11 border-border bg-background/70"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => handleAddExercise(customExercise)}
              disabled={!customExercise.trim()}
              className="h-11 border-border bg-background/70 px-4 text-sm font-semibold text-foreground hover:bg-muted"
              aria-label="Add custom exercise"
            >
              <Plus className="size-4" aria-hidden="true" />
              Додати
            </Button>
          </div>
        </section>

        <section
          aria-label="Training exercise metrics"
          className="grid grid-cols-3 gap-2 border-y border-border py-4"
        >
          {Object.entries(metricConfig).map(([metric, config]) => (
            <div
              key={metric}
              className="rounded-xl bg-card px-2 py-3 text-center shadow-2xl shadow-black/10"
            >
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {config.label}
              </p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={() =>
                    handleMetricChange(metric as TrainingMetric, -1)
                  }
                  aria-label={`Decrease ${config.label}`}
                  className="border-border bg-background/80"
                >
                  <Minus className="size-4" aria-hidden="true" />
                </Button>
                <p className="text-2xl font-bold tabular-nums">
                  {trainingMetrics[metric as TrainingMetric]}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={() =>
                    handleMetricChange(metric as TrainingMetric, 1)
                  }
                  aria-label={`Increase ${config.label}`}
                  className="border-border bg-background/80"
                >
                  <Plus className="size-4" aria-hidden="true" />
                </Button>
              </div>
              <p className="text-[0.65rem] font-medium text-muted-foreground">
                {config.unit}
              </p>
            </div>
          ))}
        </section>

        <Button
          type="button"
          onClick={() => handleAddExercise(selectedExercise)}
          disabled={!selectedExercise}
          className="h-12 rounded-xl bg-foreground text-base font-semibold text-background hover:bg-foreground/90"
          aria-label="Add selected exercise to training"
        >
          Додати до тренування
        </Button>

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
            onClick={addLoop}
            disabled={trainingExercises.length === 0}
            className="mt-4 h-12 w-full rounded-xl bg-emerald-400/70 text-base font-semibold text-black hover:bg-emerald-500"
            aria-label="Confirm created program"
          >
            Confirm
          </Button>
        </section>
      </section>
    </main>
  );
};

export default CreateLoop;
