import { create } from "zustand";
import type {
  ExerciseField,
  ExerciseFormItem,
  ExerciseId,
  ExerciseValues,
} from "@/types/exerciseFormTypes";

type ConfirmedExercises = Record<ExerciseId, boolean>;

type ExerciseStore = {
  exerciseValues: ExerciseValues;
  confirmedExercises: ConfirmedExercises;
  exercises: ExerciseFormItem[];
  handleExerciseValueChange: (
    id: ExerciseId,
    field: ExerciseField,
    value: string,
  ) => void;
  handleExerciseConfirm: (id: ExerciseId) => void;
};

const effortItems: Pick<ExerciseFormItem, "id" | "name">[] = [
  { name: "Bench Press", id: 1 },
  { name: "Squat", id: 2 },
  { name: "Pull-Ups", id: 3 },
];

const initialExerciseValues: ExerciseValues = {
  1: { kg: "", reps: "" },
  2: { kg: "", reps: "" },
  3: { kg: "", reps: "" },
};

const initialConfirmedExercises: ConfirmedExercises = {
  1: false,
  2: false,
  3: false,
};

const getExercises = (
  exerciseValues: ExerciseValues,
  confirmedExercises: ConfirmedExercises,
): ExerciseFormItem[] =>
  effortItems.map((item) => {
    const values = exerciseValues[item.id];

    return {
      ...item,
      values,
      isConfirmed: confirmedExercises[item.id],
      isConfirmDisabled: !values.kg.trim() || !values.reps.trim(),
    };
  });

export const useExerciseStore = create<ExerciseStore>((set) => ({
  exerciseValues: initialExerciseValues,
  confirmedExercises: initialConfirmedExercises,
  exercises: getExercises(initialExerciseValues, initialConfirmedExercises),
  handleExerciseValueChange: (id, field, value) =>
    set((currentState) => {
      const exerciseValues = {
        ...currentState.exerciseValues,
        [id]: {
          ...currentState.exerciseValues[id],
          [field]: value,
        },
      };
      const confirmedExercises = {
        ...currentState.confirmedExercises,
        [id]: false,
      };

      return {
        exerciseValues,
        confirmedExercises,
        exercises: getExercises(exerciseValues, confirmedExercises),
      };
    }),
  handleExerciseConfirm: (id) =>
    set((currentState) => {
      const confirmedExercises = {
        ...currentState.confirmedExercises,
        [id]: true,
      };

      return {
        confirmedExercises,
        exercises: getExercises(
          currentState.exerciseValues,
          confirmedExercises,
        ),
      };
    }),
}));
