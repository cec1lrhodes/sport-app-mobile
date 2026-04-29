import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/ui/button";
import { useLoopsStore } from "@/store/useLoopsStore";
import exerciseBase from "@/data/exercise_base";
import CreateLoopHeader from "@/components/layout/CreateLoop_Layout/CreateLoopHeader";
import ExercisePicker from "@/components/layout/CreateLoop_Layout/ExercisePicker";
import MetricsSelector from "@/components/layout/CreateLoop_Layout/MetricsSelector";
import TrainingList from "@/components/layout/CreateLoop_Layout/TrainingList";
import { InputForm } from "@/components/layout/common/InputForm";
import {
  formatExerciseLine,
  type TrainingExercise,
  type TrainingMetric,
  type TrainingMetrics,
} from "@/components/layout/CreateLoop_Layout/createLoopTypes";

const CreateLoop = () => {
  const addLoop = useLoopsStore((state) => state.addLoop);
  const currentProgramTitle = useLoopsStore((state) => state.loopDraft.title);
  const handleLoopDraftChange = useLoopsStore(
    (state) => state.handleLoopDraftChange,
  );
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
  const [trainingMetrics, setTrainingMetrics] = useState<TrainingMetrics>({
    sets: 3,
    reps: 8,
    weight: 70,
  });
  const [programName, setProgramName] = useState("");
  const [isProgramNameDialogOpen, setIsProgramNameDialogOpen] = useState(false);
  const [isProgramNameSet, setIsProgramNameSet] = useState(false);

  useEffect(() => {
    handleLoopDraftChange(
      "exercise",
      trainingExercises.map(formatExerciseLine).join("\n"),
    );
    handleLoopDraftChange("repetitions", String(trainingMetrics.reps));
    handleLoopDraftChange("weight", String(trainingMetrics.weight));
  }, [handleLoopDraftChange, trainingExercises, trainingMetrics]);

  useEffect(() => {
    if (!isProgramNameSet) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsProgramNameSet(false);
    }, 1200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isProgramNameSet]);

  const handleMetricValueChange = useCallback(
    (metric: TrainingMetric, value: number) => {
      setTrainingMetrics((currentMetrics) => {
        return {
          ...currentMetrics,
          [metric]: value,
        };
      });
    },
    [],
  );

  const handleSelectExercise = (exerciseName: string) => {
    setSelectedExercise(exerciseName);
  };

  const handleCustomExerciseChange = (exerciseName: string) => {
    setCustomExercise(exerciseName);
  };

  const handleAddExercise = (exerciseName: string) => {
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
        sets: trainingMetrics.sets,
        reps: trainingMetrics.reps,
        weight: trainingMetrics.weight,
      },
    ]);
    setCustomExercise("");
  };

  const handleRemoveExercise = (exerciseId: number) => {
    setTrainingExercises((currentExercises) =>
      currentExercises.filter((exercise) => exercise.id !== exerciseId),
    );
  };

  const handleSetProgramName = () => {
    setProgramName(currentProgramTitle);
    setIsProgramNameDialogOpen(true);
  };

  const handleProgramNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProgramName(event.target.value);
  };

  const handleCloseProgramNameDialog = () => {
    setIsProgramNameDialogOpen(false);
  };

  const handleSubmitProgramName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedProgramName = programName.trim();

    if (!trimmedProgramName) {
      return;
    }

    handleLoopDraftChange("title", trimmedProgramName);
    setIsProgramNameDialogOpen(false);
    setIsProgramNameSet(true);
  };

  const handleConfirmTraining = () => {
    addLoop();
    setTrainingExercises([]);
    setCustomExercise("");
  };

  return (
    <main className="min-h-screen bg-background px-4 pb-24 pt-6 text-foreground">
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-md flex-col gap-5">
        <CreateLoopHeader />

        <ExercisePicker
          exerciseOptions={exerciseOptions}
          selectedExercise={selectedExercise}
          customExercise={customExercise}
          onSelectExercise={handleSelectExercise}
          onCustomExerciseChange={handleCustomExerciseChange}
          onAddExercise={handleAddExercise}
        />

        <MetricsSelector
          trainingMetrics={trainingMetrics}
          onMetricValueChange={handleMetricValueChange}
        />

        <Button
          type="button"
          onClick={() => handleAddExercise(selectedExercise)}
          disabled={!selectedExercise}
          className="h-12 rounded-xl bg-foreground text-base font-semibold text-background hover:bg-foreground/90"
          aria-label="Add selected exercise to training"
        >
          Add to training
        </Button>

        <TrainingList
          trainingExercises={trainingExercises}
          isNameSet={isProgramNameSet}
          onSetName={handleSetProgramName}
          onConfirm={handleConfirmTraining}
          onRemoveExercise={handleRemoveExercise}
        />
      </section>

      {isProgramNameDialogOpen ? (
        <InputForm
          title="Set program name"
          description="Enter a name that will be shown on the saved program card."
          value={programName}
          placeholder="Program name"
          inputAriaLabel="Program name"
          cancelLabel="Cancel"
          submitLabel="Save"
          cancelAriaLabel="Cancel program name"
          submitAriaLabel="Save program name"
          disabled={!programName.trim()}
          onSubmit={handleSubmitProgramName}
          onChange={handleProgramNameChange}
          onCancel={handleCloseProgramNameDialog}
        />
      ) : null}
    </main>
  );
};

export default CreateLoop;
