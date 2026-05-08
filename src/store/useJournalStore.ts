import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { TrainingDay } from "@/components/layout/CreateLoop_Layout/loop_utils/createLoopTypes";

export type JournalNoteKey = `${number}-${number}-${TrainingDay}-${string}`;

type JournalStore = {
  setResults: Record<string, string>;
  trainingNotes: Record<JournalNoteKey, string>;
  handleSetResultChange: (resultKey: string, value: string) => void;
  handleTrainingNoteChange: (noteKey: JournalNoteKey, value: string) => void;
};

export const getJournalNoteKey = (
  loopId: number,
  week: number,
  day: TrainingDay,
  dateKey: string,
): JournalNoteKey => `${loopId}-${week}-${day}-${dateKey}`;

export const useJournalStore = create<JournalStore>()(
  persist(
    (set) => ({
      setResults: {},
      trainingNotes: {},
      handleSetResultChange: (resultKey, value) =>
        set((currentState) => ({
          setResults: {
            ...currentState.setResults,
            [resultKey]: value,
          },
        })),
      handleTrainingNoteChange: (noteKey, value) =>
        set((currentState) => {
          const nextNoteValue = value;

          if (!nextNoteValue.trim()) {
            const { [noteKey]: _removedNote, ...trainingNotes } =
              currentState.trainingNotes;

            return {
              trainingNotes,
            };
          }

          return {
            trainingNotes: {
              ...currentState.trainingNotes,
              [noteKey]: nextNoteValue,
            },
          };
        }),
    }),
    {
      name: "journal-results",
    },
  ),
);
