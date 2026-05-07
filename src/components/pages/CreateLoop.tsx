import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";

import { Button } from "@/ui/button";
import { useLoopsStore } from "@/store/useLoopsStore";
import CreateLoopHeader from "@/components/layout/CreateLoop_Layout/CreateLoopHeader";
import ExercisePicker from "@/components/layout/CreateLoop_Layout/ExercisePicker";
import MetricsSelector from "@/components/layout/CreateLoop_Layout/MetricsSelector";
import TrainingList from "@/components/layout/CreateLoop_Layout/TrainingList";
import TrainingScheduleSelector from "@/components/layout/CreateLoop_Layout/TrainingScheduleSelector";
import { useCreateLoopForm } from "@/components/layout/CreateLoop_Layout/loop_utils/useCreateLoopForm";
import { InputForm } from "@/components/layout/common/InputForm";

const CreateLoop = () => {
  const addLoop = useLoopsStore((state) => state.addLoop);
  const {
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
  } = useCreateLoopForm();
  const [programName, setProgramName] = useState("");
  const [isProgramNameDialogOpen, setIsProgramNameDialogOpen] = useState(false);
  const [isProgramNameSet, setIsProgramNameSet] = useState(false);

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

  const handleSelectExercise = (exerciseName: string) => {
    setSelectedExercise(exerciseName);
  };

  const handleCustomExerciseChange = (exerciseName: string) => {
    setCustomExercise(exerciseName);
  };

  const handleSetProgramName = () => {
    setIsProgramNameDialogOpen(true);
  };

  const handleProgramNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProgramName(event.target.value);
  };

  const handleCloseProgramNameDialog = () => {
    setIsProgramNameDialogOpen(false);
  };

  const handleSubmitProgramName = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedProgramName = programName.trim();

    if (!trimmedProgramName) {
      return;
    }

    setProgramName(trimmedProgramName);
    setIsProgramNameDialogOpen(false);
    setIsProgramNameSet(true);
  };

  const handleConfirmTraining = () => {
    if (trainingExercises.length === 0) {
      return;
    }

    addLoop({
      title: programName,
      weeks: programWeeks,
      exercises: trainingExercises,
      targetWeight: trainingMetrics.weight,
    });
    resetTraining();
    setProgramName("");
    setIsProgramNameSet(false);
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

        <TrainingScheduleSelector
          selectedWeek={selectedWeek}
          selectedDay={selectedDay}
          onWeekChange={setSelectedWeek}
          onDayChange={setSelectedDay}
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
