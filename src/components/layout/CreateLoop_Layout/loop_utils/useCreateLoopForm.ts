import { useCallback, useMemo, useState } from "react";

import exerciseBase from "@/data/exercise_base";

import type {
  TrainingDay,
  TrainingExercise,
  TrainingMetric,
  TrainingMetrics,
} from "./createLoopTypes";

const initialTrainingMetrics: TrainingMetrics = {
  sets: 3,
  reps: 8,
  weight: 70,
};

export const useCreateLoopForm = () => {
  const exerciseOptions = useMemo(
    () => Array.from(new Set(exerciseBase.map((exercise) => exercise.name))),
    [],
  );
  const [selectedExercise, setSelectedExercise] = useState(
    exerciseOptions[0] ?? "",
  );
  const [customExercise, setCustomExercise] = useState("");
  const [trainingExercises, setTrainingExercises] = useState<
    TrainingExercise[]
  >([]);
  const [trainingMetrics, setTrainingMetrics] = useState<TrainingMetrics>(
    initialTrainingMetrics,
  );
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState<TrainingDay>("A");

  const programWeeks = useMemo(() => {
    if (trainingExercises.length === 0) {
      return 1;
    }

    return Math.max(...trainingExercises.map((exercise) => exercise.week));
  }, [trainingExercises]);

  const handleMetricValueChange = useCallback(
    (metric: TrainingMetric, value: number) => {
      setTrainingMetrics((currentMetrics) => ({
        ...currentMetrics,
        [metric]: value,
      }));
    },
    [],
  );

  const handleAddExercise = useCallback(
    (exerciseName: string) => {
      const trimmedExerciseName = exerciseName.trim();

      if (!trimmedExerciseName) {
        return;
      }

      setSelectedExercise(trimmedExerciseName);
      setTrainingExercises((currentExercises) => [
        ...currentExercises,
        {
          id: Date.now(),
          name: trimmedExerciseName,
          week: selectedWeek,
          day: selectedDay,
          sets: trainingMetrics.sets,
          reps: trainingMetrics.reps,
          weight: trainingMetrics.weight,
        },
      ]);
      setCustomExercise("");
    },
    [selectedDay, selectedWeek, trainingMetrics],
  );

  const handleRemoveExercise = useCallback((exerciseId: number) => {
    setTrainingExercises((currentExercises) =>
      currentExercises.filter((exercise) => exercise.id !== exerciseId),
    );
  }, []);

  const resetTraining = useCallback(() => {
    setTrainingExercises([]);
    setCustomExercise("");
  }, []);

  return {
    exerciseOptions,
    selectedExercise,
    customExercise,
    trainingExercises,
    trainingMetrics,
    selectedWeek,
    selectedDay,
    programWeeks,
    setSelectedExercise,
    setCustomExercise,
    setSelectedWeek,
    setSelectedDay,
    handleMetricValueChange,
    handleAddExercise,
    handleRemoveExercise,
    resetTraining,
  };
};
