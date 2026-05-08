import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { TrainingDay } from "@/components/layout/CreateLoop_Layout/loop_utils/createLoopTypes";

export type TrainingCompletionKey = `${number}-${number}-${TrainingDay}`;

type TrainingCompletionStore = {
  trainingCompletionDates: Record<TrainingCompletionKey, string>;
  setTrainingCompletionDate: (
    loopId: number,
    week: number,
    day: TrainingDay,
    date: Date,
  ) => void;
  clearTrainingCompletionDate: (
    loopId: number,
    week: number,
    day: TrainingDay,
  ) => void;
};

export const getTrainingCompletionKey = (
  loopId: number,
  week: number,
  day: TrainingDay,
): TrainingCompletionKey => `${loopId}-${week}-${day}`;

export const formatTrainingDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const parseTrainingDateKey = (dateKey: string) => {
  const [year, month, day] = dateKey.split("-").map(Number);

  if (!year || !month || !day) {
    return undefined;
  }

  return new Date(year, month - 1, day);
};

export const formatTrainingDateLabel = (dateKey: string) => {
  const date = parseTrainingDateKey(dateKey);

  if (!date) {
    return "";
  }

  return date.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};

export const useTrainingCompletionStore = create<TrainingCompletionStore>()(
  persist(
    (set) => ({
      trainingCompletionDates: {},
      setTrainingCompletionDate: (loopId, week, day, date) =>
        set((currentState) => ({
          trainingCompletionDates: {
            ...currentState.trainingCompletionDates,
            [getTrainingCompletionKey(loopId, week, day)]:
              formatTrainingDateKey(date),
          },
        })),
      clearTrainingCompletionDate: (loopId, week, day) =>
        set((currentState) => {
          const completionKey = getTrainingCompletionKey(loopId, week, day);
          const { [completionKey]: _removedDate, ...trainingCompletionDates } =
            currentState.trainingCompletionDates;

          return {
            trainingCompletionDates,
          };
        }),
    }),
    {
      name: "training-completion-dates",
    },
  ),
);
