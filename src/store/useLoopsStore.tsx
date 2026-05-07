import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  formatExerciseLine,
  type TrainingDay,
  type TrainingExercise,
} from "@/components/layout/CreateLoop_Layout/loop_utils/createLoopTypes";

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

type AddLoopPayload = {
  title: string;
  weeks: number;
  exercises: TrainingExercise[];
  targetWeight: number;
};

type LoopsStore = {
  loops: LoopCard[];
  customLoops: LoopCard[];
  deletedLoopIds: number[];
  selectedLoopId: number | null;
  addLoop: (payload: AddLoopPayload) => void;
  deleteLoop: (loopId: number) => void;
  setSelectedLoopId: (loopId: number) => void;
};

type PersistedLoopsState = Pick<
  LoopsStore,
  "customLoops" | "deletedLoopIds" | "selectedLoopId"
>;

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

const getLoops = (customLoops: LoopCard[], deletedLoopIds: number[] = []) => {
  const visibleInitialLoops = initialLoops.filter(
    (loop) => !deletedLoopIds.includes(loop.id),
  );

  return [...visibleInitialLoops, ...customLoops];
};

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

const createLoopCard = ({
  title,
  weeks,
  exercises,
  targetWeight,
}: AddLoopPayload): LoopCard => {
  const exerciseLines = exercises.map(formatExerciseLine);
  const firstExerciseTitle = exercises[0]?.name.trim();

  return {
    id: Date.now(),
    title:
      title.trim() ||
      (exercises.length > 1 ? "Custom program" : firstExerciseTitle) ||
      "New program",
    description: exerciseLines.join(" / "),
    createdAt: getFormattedDate(),
    exercisesCount: exercises.length,
    weeks,
    exercises,
    target: targetWeight ? `${targetWeight} kg` : "RPE 8",
    status: "Saved",
  };
};

export const useLoopsStore = create<LoopsStore>()(
  persist<LoopsStore, [], [], PersistedLoopsState>(
    (set) => ({
      loops: initialLoops,
      customLoops: [],
      deletedLoopIds: [],
      selectedLoopId: initialLoops[0]?.id ?? null,
      addLoop: (payload) =>
        set((currentState) => {
          if (payload.exercises.length === 0) {
            return currentState;
          }

          const loop = createLoopCard(payload);
          const customLoops = [...currentState.customLoops, loop];

          return {
            customLoops,
            loops: getLoops(customLoops, currentState.deletedLoopIds),
            selectedLoopId: loop.id,
          };
        }),
      deleteLoop: (loopId) =>
        set((currentState) => {
          const customLoops = currentState.customLoops.filter(
            (loop) => loop.id !== loopId,
          );
          const deletedLoopIds = initialLoops.some((loop) => loop.id === loopId)
            ? [...new Set([...currentState.deletedLoopIds, loopId])]
            : currentState.deletedLoopIds;
          const loops = getLoops(customLoops, deletedLoopIds);
          const selectedLoopId =
            currentState.selectedLoopId === loopId
              ? (loops[0]?.id ?? null)
              : currentState.selectedLoopId;

          return {
            customLoops,
            deletedLoopIds,
            loops,
            selectedLoopId,
          };
        }),
      setSelectedLoopId: (loopId) =>
        set(() => ({
          selectedLoopId: loopId,
        })),
    }),
    {
      name: "sport-app-custom-loops",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        customLoops: state.customLoops,
        deletedLoopIds: state.deletedLoopIds,
        selectedLoopId: state.selectedLoopId,
      }),
      merge: (persistedState, currentState) => {
        const persistedLoopsState =
          persistedState as Partial<PersistedLoopsState> | null;
        const customLoops = persistedLoopsState?.customLoops ?? [];
        const deletedLoopIds = persistedLoopsState?.deletedLoopIds ?? [];
        const loops = getLoops(customLoops, deletedLoopIds);
        const selectedLoopId =
          persistedLoopsState?.selectedLoopId ?? currentState.selectedLoopId;

        return {
          ...currentState,
          customLoops,
          deletedLoopIds,
          loops,
          selectedLoopId: loops.some((loop) => loop.id === selectedLoopId)
            ? selectedLoopId
            : (loops[0]?.id ?? null),
        };
      },
    },
  ),
);
