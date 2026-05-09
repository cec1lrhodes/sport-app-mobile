import type {
  TrainingDay,
  TrainingExercise,
} from "@/components/layout/CreateLoop_Layout/loop_utils/createLoopTypes";

import type { JournalWeek } from "./journalTypes";

export const trainingDays: TrainingDay[] = ["A", "B", "C"];

const createEmptyTrainingDays = (): Record<
  TrainingDay,
  TrainingExercise[]
> => ({
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

export const getJournalSetResultKey = (
  loopId: number,
  week: number,
  day: TrainingDay,
  exerciseId: number,
  setNumber: number,
) => `${loopId}-${week}-${day}-${exerciseId}-${setNumber}`;

export type JournalTrainingStatus = "pending" | "completed" | "mismatched";

export const getJournalTrainingStatus = (
  loopId: number,
  week: number,
  day: TrainingDay,
  exercises: TrainingExercise[],
  setResults: Record<string, string>,
): JournalTrainingStatus => {
  if (exercises.length === 0) {
    return "pending";
  }

  let hasRepsMismatch = false;

  for (const exercise of exercises) {
    for (let index = 0; index < exercise.sets; index += 1) {
      const setNumber = index + 1;
      const resultKey = getJournalSetResultKey(
        loopId,
        week,
        day,
        exercise.id,
        setNumber,
      );
      const result = setResults[resultKey]?.trim();

      if (!result) {
        return "pending";
      }

      if (Number(result) < exercise.reps) {
        hasRepsMismatch = true;
      }
    }
  }

  return hasRepsMismatch ? "mismatched" : "completed";
};

export const isJournalTrainingCompleted = (
  loopId: number,
  week: number,
  day: TrainingDay,
  exercises: TrainingExercise[],
  setResults: Record<string, string>,
) => {
  return (
    getJournalTrainingStatus(loopId, week, day, exercises, setResults) ===
    "completed"
  );
};

// PROGRESS BAR IN THIRDpage(JOURNAL PAGE)
export const getJournalTrainingProgress = (
  loopId: number,
  journalWeeks: JournalWeek[],
  setResults: Record<string, string>,
) => {
  const trainingDayGroups = journalWeeks.flatMap((weekGroup) =>
    trainingDays
      .map((day) => ({
        week: weekGroup.week,
        day,
        exercises: weekGroup.days[day],
      }))
      .filter(({ exercises }) => exercises.length > 0),
  );
  const completedTrainingDays = trainingDayGroups.filter(
    ({ week, day, exercises }) =>
      getJournalTrainingStatus(loopId, week, day, exercises, setResults) !==
      "pending",
  ).length;
  const totalTrainingDays = trainingDayGroups.length;

  return {
    completedTrainingDays,
    totalTrainingDays,
    progress:
      totalTrainingDays > 0
        ? Math.round((completedTrainingDays / totalTrainingDays) * 100)
        : 0,
  };
};
