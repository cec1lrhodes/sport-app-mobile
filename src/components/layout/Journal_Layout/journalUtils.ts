import type {
  TrainingDay,
  TrainingExercise,
} from "@/components/layout/CreateLoop_Layout/loop_utils/createLoopTypes";

import type { JournalWeek } from "./journalTypes";

export const trainingDays: TrainingDay[] = ["A", "B", "C"];

const createEmptyTrainingDays = (): Record<TrainingDay, TrainingExercise[]> => ({
  A: [],
  B: [],
  C: [],
});

export const buildJournalWeeks = (
  weeks: number,
  exercises: TrainingExercise[],
): JournalWeek[] => {
  return Array.from({ length: weeks }, (_, index) => {
    const week = index + 1;
    const days = createEmptyTrainingDays();

    exercises
      .filter((exercise) => exercise.week === week)
      .forEach((exercise) => {
        days[exercise.day].push(exercise);
      });

    return {
      week,
      days,
    };
  });
};

export const getExercisePreview = (exercises: TrainingExercise[]) => {
  return exercises.map((exercise) => exercise.name).join(", ");
};
