import { useMemo } from "react";

import type { TrainingDay } from "@/components/layout/CreateLoop_Layout/loop_utils/createLoopTypes";
import { cn } from "@/lib/utils";
import { useJournalStore } from "@/store/useJournalStore";
import { formatTrainingDateLabel } from "@/store/useTrainingCompletionStore";

type JournalExistingNotesProps = {
  isOpen: boolean;
  loopId?: number;
};

type JournalNoteItem = {
  key: string;
  day: TrainingDay;
  dateKey: string;
  note: string;
};

const trainingDays: TrainingDay[] = ["A", "B", "C"];

const parseJournalNoteKey = (noteKey: string) => {
  const [loopIdValue, weekValue, dayValue, ...dateParts] = noteKey.split("-");
  const loopId = Number(loopIdValue);
  const week = Number(weekValue);
  const dateKey = dateParts.join("-");

  if (
    !loopId ||
    !week ||
    !trainingDays.includes(dayValue as TrainingDay) ||
    !dateKey
  ) {
    return null;
  }

  return {
    loopId,
    week,
    day: dayValue as TrainingDay,
    dateKey,
  };
};

export const JournalExistingNotes = ({
  isOpen,
  loopId,
}: JournalExistingNotesProps) => {
  const trainingNotes = useJournalStore((state) => state.trainingNotes);

  const notes = useMemo<JournalNoteItem[]>(() => {
    if (!loopId) {
      return [];
    }

    return Object.entries(trainingNotes)
      .flatMap(([noteKey, note]) => {
        const parsedNoteKey = parseJournalNoteKey(noteKey);

        if (!parsedNoteKey || parsedNoteKey.loopId !== loopId || !note.trim()) {
          return [];
        }

        return [
          {
            key: noteKey,
            day: parsedNoteKey.day,
            dateKey: parsedNoteKey.dateKey,
            note,
          },
        ];
      })
      .sort((firstNote, secondNote) =>
        firstNote.dateKey.localeCompare(secondNote.dateKey),
      );
  }, [loopId, trainingNotes]);

  return (
    <section
      className={cn(
        "mx-auto grid w-full max-w-sm overflow-hidden transition-[grid-template-rows,opacity,margin] duration-300 ease-out",
        isOpen
          ? "mt-3 grid-rows-[1fr] opacity-100"
          : "mt-0 grid-rows-[0fr] opacity-0",
      )}
      aria-hidden={!isOpen}
    >
      <div className="min-h-0">
        <div className="rounded-xl border border-border bg-card/40 p-4 text-sm shadow-sm">
          {notes.length > 0 ? (
            <div className="space-y-3">
              {notes.map((note) => (
                <p key={note.key} className="leading-relaxed text-foreground">
                  <span className="font-semibold text-primary">
                    {note.day}({formatTrainingDateLabel(note.dateKey)}).
                  </span>{" "}
                  {note.note}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Поки немає збережених нотаток.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
