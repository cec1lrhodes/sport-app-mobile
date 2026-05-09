import { useMemo, useState } from "react";

import type {
  TrainingDay,
  TrainingExercise,
} from "@/components/layout/CreateLoop_Layout/loop_utils/createLoopTypes";
import { JournalExistingNotes } from "@/components/layout/Journal_Layout/JournalExistingNotes";
import JournalHeader from "@/components/layout/Journal_Layout/JournalHeader";
import JournalTrainingDialog from "@/components/layout/Journal_Layout/JournalTrainingDialog";
import JournalWeekList from "@/components/layout/Journal_Layout/JournalWeekList";
import type { SelectedTraining } from "@/components/layout/Journal_Layout/journal_utils/journalTypes";
import {
  buildJournalWeeks,
  getJournalTrainingStatus,
  getJournalTrainingProgress,
} from "@/components/layout/Journal_Layout/journal_utils/journalUtils";
import { cn } from "@/lib/utils";
import { useJournalStore } from "@/store/useJournalStore";
import { useLoopsStore } from "@/store/useLoopsStore";
import {
  formatTrainingDateKey,
  parseTrainingDateKey,
  useTrainingCompletionStore,
} from "@/store/useTrainingCompletionStore";
import { Card } from "@/ui/card";
import { Calendar } from "@/ui/calendar";
import { Progress } from "@/ui/progress";
import { Field, FieldLabel } from "@/ui/field";

const ThirdPage = () => {
  const loops = useLoopsStore((state) => state.loops);
  const selectedLoopId = useLoopsStore((state) => state.selectedLoopId);
  const selectedLoop =
    loops.find((loop) => loop.id === selectedLoopId) ?? loops[0] ?? null;
  const setResults = useJournalStore((state) => state.setResults);
  const handleSetResultChange = useJournalStore(
    (state) => state.handleSetResultChange,
  );
  const trainingCompletionDates = useTrainingCompletionStore(
    (state) => state.trainingCompletionDates,
  );
  const [openWeek, setOpenWeek] = useState<number | null>(null);
  const [openNotes, setOpenNotes] = useState(false);

  const [selectedTraining, setSelectedTraining] =
    useState<SelectedTraining | null>(null);

  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleOpenNotes = () => {
    setOpenNotes((current) => !current);
  };

  const journalWeeks = useMemo(() => {
    if (!selectedLoop) {
      return [];
    }

    return buildJournalWeeks(selectedLoop.weeks, selectedLoop.exercises);
  }, [selectedLoop]);

  const currentLoopTrainingCompletions = useMemo(() => {
    if (!selectedLoop) {
      return [];
    }

    return Object.entries(trainingCompletionDates).flatMap(
      ([completionKey, dateKey]) => {
        const [loopId, week, day] = completionKey.split("-");

        if (Number(loopId) !== selectedLoop.id) {
          return [];
        }

        const weekNumber = Number(week);
        const journalWeek = journalWeeks.find(
          (weekGroup) => weekGroup.week === weekNumber,
        );

        const trainingDay = day as TrainingDay;

        if (!journalWeek || !(trainingDay in journalWeek.days)) {
          return [];
        }

        return [
          {
            week: weekNumber,
            dateKey,
            status: getJournalTrainingStatus(
              selectedLoop.id,
              weekNumber,
              trainingDay,
              journalWeek.days[trainingDay],
              setResults,
            ),
          },
        ];
      },
    );
  }, [journalWeeks, selectedLoop, setResults, trainingCompletionDates]);

  const mismatchedTrainingDateKeys = useMemo(() => {
    return new Set(
      currentLoopTrainingCompletions
        .filter((completion) => completion.status === "mismatched")
        .map((completion) => completion.dateKey),
    );
  }, [currentLoopTrainingCompletions]);

  const completedTrainingDates = useMemo(() => {
    const uniqueDateKeys = [
      ...new Set(
        currentLoopTrainingCompletions
          .filter(
            (completion) => !mismatchedTrainingDateKeys.has(completion.dateKey),
          )
          .map((completion) => completion.dateKey),
      ),
    ];

    return uniqueDateKeys.flatMap((dateKey) => {
      const parsedDate = parseTrainingDateKey(dateKey);

      return parsedDate ? [parsedDate] : [];
    });
  }, [currentLoopTrainingCompletions, mismatchedTrainingDateKeys]);

  const mismatchedTrainingDates = useMemo(() => {
    return [...mismatchedTrainingDateKeys].flatMap((dateKey) => {
      const parsedDate = parseTrainingDateKey(dateKey);

      return parsedDate ? [parsedDate] : [];
    });
  }, [mismatchedTrainingDateKeys]);

  const trainingProgress = useMemo(() => {
    if (!selectedLoop) {
      return {
        completedTrainingDays: 0,
        totalTrainingDays: 0,
        progress: 0,
      };
    }

    return getJournalTrainingProgress(
      selectedLoop.id,
      journalWeeks,
      setResults,
    );
  }, [journalWeeks, selectedLoop, setResults]);

  const handleToggleWeek = (week: number) => {
    setOpenWeek((currentWeek) => (currentWeek === week ? null : week));
  };

  const handleSelectDate = (selectedDate: Date | undefined) => {
    setDate(selectedDate);

    if (!selectedDate) {
      return;
    }

    const selectedDateKey = formatTrainingDateKey(selectedDate);
    const selectedTrainingCompletion = currentLoopTrainingCompletions.find(
      (completion) => completion.dateKey === selectedDateKey,
    );

    if (selectedTrainingCompletion) {
      setOpenWeek(selectedTrainingCompletion.week);
    }
  };

  const handleOpenTraining = (
    week: number,
    day: TrainingDay,
    exercises: TrainingExercise[],
  ) => {
    if (!selectedLoop) {
      return;
    }

    setSelectedTraining({
      loopId: selectedLoop.id,
      week,
      day,
      exercises,
    });
  };

  const handleCloseTraining = () => {
    setSelectedTraining(null);
  };

  return (
    <main className="min-h-screen bg-background px-4 pb-24 pt-8 text-foreground">
      <section
        className={cn(
          "mx-auto flex w-full max-w-sm flex-col gap-7 transition-all duration-300",
          selectedTraining && "blur-sm",
        )}
      >
        <JournalHeader
          title={selectedLoop?.title}
          weeks={selectedLoop?.weeks}
        />

        <div>
          <Field className="w-full max-w-sm">
            <FieldLabel htmlFor="progress-upload">
              <span>Training progress</span>
              <span className="ml-auto">
                {trainingProgress.progress}% (
                {trainingProgress.completedTrainingDays}/
                {trainingProgress.totalTrainingDays})
              </span>
            </FieldLabel>
            <Progress value={trainingProgress.progress} id="progress-upload" />
          </Field>
        </div>

        {selectedLoop ? (
          <JournalWeekList
            loopId={selectedLoop.id}
            journalWeeks={journalWeeks}
            openWeek={openWeek}
            setResults={setResults}
            onToggleWeek={handleToggleWeek}
            onOpenTraining={handleOpenTraining}
          />
        ) : (
          <Card className="border border-dashed border-border bg-card/80 p-6 text-center text-sm text-muted-foreground">
            Select a loop on the second page to open the journal.
          </Card>
        )}
      </section>

      <section className="mx-auto mt-3 w-full max-w-sm">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelectDate}
          modifiers={{
            training: completedTrainingDates,
            mismatchedTraining: mismatchedTrainingDates,
          }}
          className="w-full rounded-lg border"
        />
      </section>

      <section className="mx-auto mt-3 grid w-full max-w-sm grid-cols-2 gap-2">
        <button className="rounded-lg border border-border p-2">
          Statistics
        </button>
        <button
          className="rounded-lg border border-border p-2"
          onClick={handleOpenNotes}
        >
          Notes
        </button>
      </section>

      <JournalExistingNotes isOpen={openNotes} loopId={selectedLoop?.id} />

      {selectedTraining ? (
        <JournalTrainingDialog
          selectedTraining={selectedTraining}
          setResults={setResults}
          onClose={handleCloseTraining}
          onSetResultChange={handleSetResultChange}
        />
      ) : null}
    </main>
  );
};

export default ThirdPage;
