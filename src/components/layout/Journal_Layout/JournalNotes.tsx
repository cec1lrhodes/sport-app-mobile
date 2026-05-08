import type { ChangeEvent } from "react";
import { CalendarDays, NotebookPen, X } from "lucide-react";

import type { TrainingDay } from "@/components/layout/CreateLoop_Layout/loop_utils/createLoopTypes";
import { getJournalNoteKey, useJournalStore } from "@/store/useJournalStore";
import { formatTrainingDateLabel } from "@/store/useTrainingCompletionStore";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { Textarea } from "@/ui/textarea";

type JournalNotesProps = {
  loopId: number;
  week: number;
  day: TrainingDay;
  completedDateKey?: string;
  onClose: () => void;
};

export const JournalNotes = ({
  loopId,
  week,
  day,
  completedDateKey,
  onClose,
}: JournalNotesProps) => {
  const noteKey = completedDateKey
    ? getJournalNoteKey(loopId, week, day, completedDateKey)
    : null;
  const savedNote = useJournalStore((state) =>
    noteKey ? (state.trainingNotes[noteKey] ?? "") : "",
  );
  const handleTrainingNoteChange = useJournalStore(
    (state) => state.handleTrainingNoteChange,
  );
  const isDateSelected = Boolean(completedDateKey);
  const notePreviewTitle = completedDateKey
    ? `${day} (${formatTrainingDateLabel(completedDateKey)})`
    : `${day} (дата не обрана)`;

  const handleNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!noteKey) {
      return;
    }

    handleTrainingNoteChange(noteKey, event.target.value);
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-background/70 px-4 backdrop-blur-md"
      role="presentation"
      onClick={onClose}
    >
      <Card
        role="dialog"
        aria-modal="true"
        aria-labelledby="training-notes-title"
        className="w-full max-w-sm border border-primary/15 bg-card/95 p-0 shadow-2xl shadow-black/40 backdrop-blur-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <NotebookPen className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                  Training notes
                </p>
                <h2
                  id="training-notes-title"
                  className="mt-1 text-2xl font-bold"
                >
                  Замітки
                </h2>
              </div>
            </div>

            <button
              type="button"
              className="rounded-full p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={onClose}
              aria-label="Close notes"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-background/70 p-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CalendarDays
                className="size-4 text-primary"
                aria-hidden="true"
              />
              <span>День тренувань. {notePreviewTitle}</span>
            </div>
          </div>

          <label
            className="mt-5 block text-sm font-medium"
            htmlFor="training-note"
          >
            Нотатка до тренування
          </label>
          <Textarea
            id="training-note"
            value={savedNote}
            onChange={handleNoteChange}
            disabled={!isDateSelected}
            className="mt-2 min-h-40 resize-none border-primary/20 bg-background/80 text-sm leading-relaxed shadow-inner"
            placeholder="Enter your notes here"
          />

          {!isDateSelected ? (
            <p className="mt-3 rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-200">
              Спочатку обери дату тренування в діалозі, щоб нотатка збереглась
              саме до цього дня.
            </p>
          ) : null}

          <Button type="button" className="mt-5 w-full" onClick={onClose}>
            Готово
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
