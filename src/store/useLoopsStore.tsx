import { create } from "zustand";

import type {
  TrainingDay,
  TrainingExercise,
} from "@/components/layout/CreateLoop_Layout/loop_utils/createLoopTypes";

export type LoopDraftField = "title" | "exercise" | "repetitions" | "weight";

export type LoopDraft = Record<LoopDraftField, string>;

export type LoopCard = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  exercisesCount: number;
  weeks: number;
  exercises: TrainingExercise[];
  target: string;
  status: string;
};

type LoopsStore = {
  loopDraft: LoopDraft;
  loops: LoopCard[];
  selectedLoopId: number | null;
  addLoop: (weeks: number, exercises?: TrainingExercise[]) => void;
  handleLoopDraftChange: (field: LoopDraftField, value: string) => void;
  setSelectedLoopId: (loopId: number) => void;
};

const initialLoopDraft: LoopDraft = {
  title: "",
  exercise: "",
  repetitions: "",
  weight: "",
};

const trainingDays: TrainingDay[] = ["A", "B", "C"];

const createTrainingExercisesFromLines = (
  exerciseLines: string[],
  weeks = 1,
): TrainingExercise[] => {
  return exerciseLines.map((exerciseLine, index) => {
    const metricMatch = exerciseLine.match(
      /\s(\d+)x(\d+)\s+(\d+(?:\.\d+)?)kg$/i,
    );
    const day = trainingDays[index % trainingDays.length];
    const name = metricMatch?.index
      ? exerciseLine.slice(0, metricMatch.index).trim()
      : exerciseLine;

    return {
      id: index + 1,
      name: name || exerciseLine,
      week: Math.min(weeks, Math.floor(index / trainingDays.length) + 1),
      day,
      sets: metricMatch ? Number(metricMatch[1]) : 3,
      reps: metricMatch ? Number(metricMatch[2]) : 5,
      weight: metricMatch ? Number(metricMatch[3]) : 70,
    };
  });
};

const initialLoops: LoopCard[] = [
  {
    id: 1,
    title: "Strength",
    description: "28.04.26 - 00.00.00 / Bench, Squat, Pull-up",
    createdAt: "28.04.26 - 00.00.00",
    exercisesCount: 3,
    weeks: 8,
    exercises: createTrainingExercisesFromLines(
      ["Bench 3x5 70kg", "Squat 3x5 100kg", "Pull-up 3x4 20kg"],
      1,
    ),
    target: "RPE 8",
    status: "Saved",
  },
];

const getFormattedDate = () => {
  const currentDate = new Date();
  const date = currentDate.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  const time = currentDate.toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `${date} - ${time}`;
};

export const useLoopsStore = create<LoopsStore>()((set) => ({
  loopDraft: initialLoopDraft,
  loops: initialLoops,
  selectedLoopId: initialLoops[0]?.id ?? null,
  addLoop: (weeks, exercises) =>
    set((currentState) => {
      const exercise = currentState.loopDraft.exercise.trim();
      const title = currentState.loopDraft.title.trim();
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
      const trainingExercises =
        exercises && exercises.length > 0
          ? exercises
          : createTrainingExercisesFromLines(exerciseLines, weeks);
      const exercisesCount = trainingExercises.length;
      const loopId = Date.now();

      return {
        loopDraft: initialLoopDraft,
        selectedLoopId: loopId,
        loops: [
          ...currentState.loops,
          {
            id: loopId,
            title:
              title ||
              (exerciseLines.length > 1
                ? "Custom programm"
                : firstExerciseTitle || "New programm"),
            description: exerciseLines.join(" / "),
            createdAt: getFormattedDate(),
            exercisesCount,
            weeks,
            exercises: trainingExercises,
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
  setSelectedLoopId: (loopId) =>
    set(() => ({
      selectedLoopId: loopId,
    })),
}));
