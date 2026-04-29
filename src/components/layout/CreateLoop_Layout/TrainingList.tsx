import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, CircleX, ChevronDown } from "lucide-react";

import { Button } from "@/ui/button";
import {
  formatExerciseLine,
  type TrainingDay,
  type TrainingExercise,
} from "./createLoopTypes";

const trainingDays: TrainingDay[] = ["A", "B", "C"];

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
    return trainingExercises.reduce<
      {
        week: number;
        days: Record<TrainingDay, TrainingExercise[]>;
      }[]
    >((groups, exercise) => {
      const existingGroup = groups.find(
        (group) => group.week === exercise.week,
      );

      if (existingGroup) {
        existingGroup.days[exercise.day].push(exercise);
        return groups;
      }

      groups.push({
        week: exercise.week,
        days: {
          A: exercise.day === "A" ? [exercise] : [],
          B: exercise.day === "B" ? [exercise] : [],
          C: exercise.day === "C" ? [exercise] : [],
        },
      });

      return groups.sort((firstGroup, secondGroup) => {
        return firstGroup.week - secondGroup.week;
      });
    }, []);
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

  const handleSetName = () => {
    onSetName();
  };

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
          weekGroups.map((weekGroup) => {
            const isWeekOpen = openWeeks.includes(weekGroup.week);

            return (
              <div
                key={weekGroup.week}
                className="rounded-xl border border-border bg-background/70 text-sm font-medium leading-6"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-3 py-2 text-left transition-colors hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                  onClick={() => handleToggleWeek(weekGroup.week)}
                  aria-expanded={isWeekOpen}
                  aria-controls={`week-${weekGroup.week}-training`}
                >
                  <span>Week {weekGroup.week}</span>
                  <span className="text-xs text-muted-foreground">
                    {isWeekOpen ? (
                      <ChevronDown className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </button>

                {isWeekOpen ? (
                  <div
                    id={`week-${weekGroup.week}-training`}
                    className="flex flex-col gap-2 border-t border-border px-3 py-3"
                  >
                    {trainingDays.map((day) => {
                      const dayExercises = weekGroup.days[day];

                      return (
                        <div key={day} className="flex items-start gap-2">
                          <span className="w-5 shrink-0">{day}.</span>

                          {dayExercises.length > 0 ? (
                            <div className="flex flex-1 flex-col gap-2">
                              {dayExercises.map((exercise) => (
                                <div
                                  key={exercise.id}
                                  className="flex items-center justify-between gap-3"
                                >
                                  <span>{formatExerciseLine(exercise)}</span>
                                  <button
                                    type="button"
                                    className="shrink-0 rounded-full text-muted-foreground transition-all duration-200 ease-out hover:scale-110 hover:text-destructive focus:outline-none focus:ring-2 focus:ring-destructive/50 focus:ring-offset-2 focus:ring-offset-background"
                                    onClick={() =>
                                      onRemoveExercise(exercise.id)
                                    }
                                    aria-label={`Remove ${exercise.name} from training`}
                                  >
                                    <CircleX
                                      className="size-5"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="sr-only">
                              No exercises added for day {day}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })
        ) : (
          <p className="rounded-xl border border-dashed border-border px-3 py-6 text-center text-sm text-muted-foreground">
            Add your first exercise to training
          </p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button
          type="button"
          onClick={handleSetName}
          className="relative h-12 overflow-hidden rounded-xl bg-white text-base font-semibold text-black hover:bg-white/90"
          aria-label={isNameSet ? "Program name set" : "Set program name"}
        >
          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              isNameSet
                ? "-translate-y-3 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            Set Name
          </span>
          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              isNameSet ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
            aria-hidden={!isNameSet}
          >
            <Check className="size-6" aria-hidden="true" />
          </span>
        </Button>

        <Button
          type="button"
          onClick={handleConfirm}
          disabled={trainingExercises.length === 0 && !isConfirmed}
          className={`relative h-12 overflow-hidden rounded-xl bg-emerald-400/70 text-base font-semibold text-black hover:bg-emerald-500 ${
            isConfirmed ? "disabled:opacity-100" : ""
          }`}
          aria-label={
            isConfirmed ? "Program confirmed" : "Confirm created program"
          }
        >
          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              isConfirmed
                ? "-translate-y-3 opacity-0"
                : "translate-y-0 opacity-100"
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
      </div>
    </section>
  );
};

export default TrainingList;
