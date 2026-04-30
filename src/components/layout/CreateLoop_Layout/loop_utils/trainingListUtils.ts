import type { TrainingDay, TrainingExercise } from "./createLoopTypes";

export type TrainingWeekGroup = {
  week: number;
  days: Record<TrainingDay, TrainingExercise[]>;
};

export const trainingDays: TrainingDay[] = ["A", "B", "C"];

const createEmptyTrainingDays = (): Record<
  TrainingDay,
  TrainingExercise[]
> => ({
  A: [],
  B: [],
  C: [],
});

export const buildTrainingWeekGroups = (
  trainingExercises: TrainingExercise[],
) => {
  const groupsByWeek = trainingExercises.reduce<
    Record<number, TrainingWeekGroup>
  >((groups, exercise) => {
    const existingGroup = groups[exercise.week];

    if (existingGroup) {
      existingGroup.days[exercise.day].push(exercise);
      return groups;
    }

    groups[exercise.week] = {
      week: exercise.week,
      days: createEmptyTrainingDays(),
    };
    groups[exercise.week].days[exercise.day].push(exercise);

    return groups;
  }, {});

  return Object.values(groupsByWeek).sort((firstGroup, secondGroup) => {
    return firstGroup.week - secondGroup.week;
  });
};
