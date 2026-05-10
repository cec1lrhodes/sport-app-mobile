import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { TrainingDay } from "@/components/layout/CreateLoop_Layout/loop_utils/createLoopTypes";

export type ExerciseHistoryEntry = {
  id: string;
  loopId: number;
  week: number;
  day: TrainingDay;
  dateKey: string;
  exerciseId: number;
  exerciseName: string;
  plannedSets: number;
  plannedReps: number;
  plannedWeight: number;
  actualReps: number[];
  actualWeight: number;
  createdAt: string;
};

type ExerciseHistoryStore = {
  entries: ExerciseHistoryEntry[];
  upsertTrainingEntries: (entries: ExerciseHistoryEntry[]) => void;
};

const isSameTrainingExercise = (
  entry: ExerciseHistoryEntry,
  nextEntry: ExerciseHistoryEntry,
) =>
  entry.loopId === nextEntry.loopId &&
  entry.week === nextEntry.week &&
  entry.day === nextEntry.day &&
  entry.exerciseId === nextEntry.exerciseId;

export const useExerciseHistoryStore = create<ExerciseHistoryStore>()(
  persist(
    (set) => ({
      entries: [],
      upsertTrainingEntries: (nextEntries) =>
        set((currentState) => ({
          entries: [
            ...currentState.entries.filter(
              (entry) =>
                !nextEntries.some((nextEntry) =>
                  isSameTrainingExercise(entry, nextEntry),
                ),
            ),
            ...nextEntries,
          ],
        })),
    }),
    {
      name: "exercise-history",
    },
  ),
);
