import { create } from "zustand";
import { persist } from "zustand/middleware";

type JournalStore = {
  setResults: Record<string, string>;
  handleSetResultChange: (resultKey: string, value: string) => void;
};

export const useJournalStore = create<JournalStore>()(
  persist(
    (set) => ({
      setResults: {},
      handleSetResultChange: (resultKey, value) =>
        set((currentState) => ({
          setResults: {
            ...currentState.setResults,
            [resultKey]: value,
          },
        })),
    }),
    {
      name: "journal-results",
    },
  ),
);
