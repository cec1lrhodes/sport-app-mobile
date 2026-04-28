export type ExerciseId = 1 | 2 | 3;
export type ExerciseField = "kg" | "reps";
export type ExerciseValues = Record<ExerciseId, Record<ExerciseField, string>>;
export type ExerciseFormItem = {
  id: ExerciseId;
  name: string;
  values: Record<ExerciseField, string>;
  isConfirmed: boolean;
  isConfirmDisabled: boolean;
};
