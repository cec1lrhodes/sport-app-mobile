import { create } from "zustand";

export type LoopDraftField = "exercise" | "repetitions" | "weight";

export type LoopDraft = Record<LoopDraftField, string>;

export type LoopCard = {
  id: number;
  title: string;
  description: string;
  exercisesCount: number;
  weeks: number;
  target: string;
  status: string;
};

type LoopsStore = {
  loopDraft: LoopDraft;
  loops: LoopCard[];
  addLoop: () => void;
  handleLoopDraftChange: (field: LoopDraftField, value: string) => void;
};

const initialLoopDraft: LoopDraft = {
  exercise: "",
  repetitions: "",
  weight: "",
};

const initialLoops: LoopCard[] = [
  {
    id: 1,
    title: "Strength",
    description: "28.04.26 - 00.00.00 / Bench, Squat, Pull-up",
    exercisesCount: 3,
    weeks: 8,
    target: "RPE 8",
    status: "Saved",
  },
];

export const useLoopsStore = create<LoopsStore>()((set) => ({
  loopDraft: initialLoopDraft,
  loops: initialLoops,
  addLoop: () =>
    set((currentState) => {
      const exercise = currentState.loopDraft.exercise.trim();
      const exerciseLines = exercise
        .split("\n")
        .map((exerciseLine) => exerciseLine.trim())
        .filter(Boolean);

      if (exerciseLines.length === 0) {
        return currentState;
      }

      const firstExerciseTitle = exerciseLines[0]?.replace(
        /\s+\d+(?:\.\d+)? cycle.*$/,
        "",
      );
      const weight = currentState.loopDraft.weight.trim();
      const exercisesCount = exerciseLines.length;

      return {
        loops: [
          ...currentState.loops,
          {
            id: Date.now(),
            title:
              exerciseLines.length > 1
                ? "Custom programm"
                : firstExerciseTitle || "New programm",
            description: exerciseLines.join(" / "),
            exercisesCount,
            weeks: 8,
            target: weight ? `${weight} kg` : "RPE 8",
            status: "Saved",
          },
        ],
      };
    }),
  handleLoopDraftChange: (field, value) =>
    set((currentState) => ({
      loopDraft: {
        ...currentState.loopDraft,
        [field]: value,
      },
    })),
}));
