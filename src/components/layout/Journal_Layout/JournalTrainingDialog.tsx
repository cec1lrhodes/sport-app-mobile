import { X } from "lucide-react";

import { Card } from "@/ui/card";

import type { SelectedTraining } from "./journalTypes";
import JournalExerciseResult from "./JournalExerciseResult";

type JournalTrainingDialogProps = {
  selectedTraining: SelectedTraining;
  setResults: Record<string, string>;
  onClose: () => void;
  onSetResultChange: (resultKey: string, value: string) => void;
};

const JournalTrainingDialog = ({
  selectedTraining,
  setResults,
  onClose,
  onSetResultChange,
}: JournalTrainingDialogProps) => {
  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-background/55 px-4 backdrop-blur-md"
      role="presentation"
      onClick={onClose}
    >
      <Card
        role="dialog"
        aria-modal="true"
        aria-labelledby="training-dialog-title"
        className="w-full max-w-sm border border-border bg-card/85 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Week {selectedTraining.week}
            </p>
            <h2 id="training-dialog-title" className="mt-1 text-2xl font-bold">
              Training {selectedTraining.day}
            </h2>
          </div>

          <button
            type="button"
            className="rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={onClose}
            aria-label="Close training details"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-5">
          {selectedTraining.exercises.length > 0 ? (
            selectedTraining.exercises.map((exercise) => (
              <JournalExerciseResult
                key={exercise.id}
                exercise={exercise}
                setResults={setResults}
                onSetResultChange={onSetResultChange}
              />
            ))
          ) : (
            <p className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
              No exercises for this training day yet.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default JournalTrainingDialog;
