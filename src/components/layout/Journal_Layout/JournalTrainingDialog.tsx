import { useState } from "react";
import { CalendarDays, NotebookPen, X } from "lucide-react";

import {
  formatTrainingDateLabel,
  getTrainingCompletionKey,
  parseTrainingDateKey,
  useTrainingCompletionStore,
} from "@/store/useTrainingCompletionStore";
import { Button } from "@/ui/button";
import { Calendar } from "@/ui/calendar";
import { Card } from "@/ui/card";

import type { SelectedTraining } from "./journal_utils/journalTypes";
import JournalExerciseResult from "./JournalExerciseResult";
import { JournalNotes } from "./JournalNotes";

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
  const trainingCompletionDates = useTrainingCompletionStore(
    (state) => state.trainingCompletionDates,
  );
  const setTrainingCompletionDate = useTrainingCompletionStore(
    (state) => state.setTrainingCompletionDate,
  );
  const clearTrainingCompletionDate = useTrainingCompletionStore(
    (state) => state.clearTrainingCompletionDate,
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [openNotes, setOpenNotes] = useState(false);

  const handleOpenNotes = () => {
    setOpenNotes((current) => !current);
  };

  const completionKey = getTrainingCompletionKey(
    selectedTraining.loopId,
    selectedTraining.week,
    selectedTraining.day,
  );
  const completedDateKey = trainingCompletionDates[completionKey];
  const completedDate = completedDateKey
    ? parseTrainingDateKey(completedDateKey)
    : undefined;

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      return;
    }

    setTrainingCompletionDate(
      selectedTraining.loopId,
      selectedTraining.week,
      selectedTraining.day,
      date,
    );
    setIsCalendarOpen(false);
  };

  const handleClearCompletionDate = () => {
    clearTrainingCompletionDate(
      selectedTraining.loopId,
      selectedTraining.week,
      selectedTraining.day,
    );
    setIsCalendarOpen(false);
  };

  if (openNotes) {
    return (
      <JournalNotes
        loopId={selectedTraining.loopId}
        week={selectedTraining.week}
        day={selectedTraining.day}
        completedDateKey={completedDateKey}
        onClose={() => setOpenNotes(false)}
      />
    );
  }

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
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <h2 id="training-dialog-title" className="text-2xl font-bold">
                Training {selectedTraining.day}
              </h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 gap-1 px-2 text-xs text-blue-400"
                onClick={() =>
                  setIsCalendarOpen((currentValue) => !currentValue)
                }
                aria-expanded={isCalendarOpen}
              >
                <CalendarDays className="size-3.5" aria-hidden="true" />
                {completedDateKey
                  ? formatTrainingDateLabel(completedDateKey)
                  : "Set date"}
              </Button>
            </div>
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

        {isCalendarOpen ? (
          <div className="mt-4 rounded-xl border border-border bg-background/80 p-2">
            <Calendar
              mode="single"
              selected={completedDate}
              onSelect={handleDateSelect}
              className="w-full"
            />
            {completedDateKey ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-2 w-full text-muted-foreground"
                onClick={handleClearCompletionDate}
              >
                Clear selected date
              </Button>
            ) : null}
          </div>
        ) : null}

        <div className="mt-5 flex flex-col gap-5">
          {selectedTraining.exercises.length > 0 ? (
            selectedTraining.exercises.map((exercise) => (
              <JournalExerciseResult
                key={exercise.id}
                loopId={selectedTraining.loopId}
                week={selectedTraining.week}
                day={selectedTraining.day}
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

        <Button
          type="button"
          variant="outline"
          className="mt-5 w-full justify-center border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
          onClick={handleOpenNotes}
        >
          <NotebookPen className="size-4" aria-hidden="true" />
          <span className="font-serif">notes</span>
        </Button>
      </Card>
    </div>
  );
};

export default JournalTrainingDialog;
