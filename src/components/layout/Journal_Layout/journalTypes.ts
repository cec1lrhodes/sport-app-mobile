import type {
  TrainingDay,
  TrainingExercise,
} from "@/components/layout/CreateLoop_Layout/loop_utils/createLoopTypes";

export type JournalWeek = {
  week: number;
  days: Record<TrainingDay, TrainingExercise[]>;
};

export type SelectedTraining = {
  week: number;
  day: TrainingDay;
  exercises: TrainingExercise[];
};
