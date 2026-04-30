import { useMemo, useState } from "react";

import type {
  TrainingDay,
  TrainingExercise,
} from "@/components/layout/CreateLoop_Layout/loop_utils/createLoopTypes";
import JournalHeader from "@/components/layout/Journal_Layout/JournalHeader";
import JournalTrainingDialog from "@/components/layout/Journal_Layout/JournalTrainingDialog";
import JournalWeekList from "@/components/layout/Journal_Layout/JournalWeekList";
import type { SelectedTraining } from "@/components/layout/Journal_Layout/journalTypes";
import { buildJournalWeeks } from "@/components/layout/Journal_Layout/journalUtils";
import { cn } from "@/lib/utils";
import { useLoopsStore } from "@/store/useLoopsStore";
import { Card } from "@/ui/card";

const ThirdPage = () => {
  const loops = useLoopsStore((state) => state.loops);
  const selectedLoopId = useLoopsStore((state) => state.selectedLoopId);
  const selectedLoop =
    loops.find((loop) => loop.id === selectedLoopId) ?? loops[0] ?? null;
  const [openWeek, setOpenWeek] = useState<number | null>(1);
  const [selectedTraining, setSelectedTraining] =
    useState<SelectedTraining | null>(null);
  const [setResults, setSetResults] = useState<Record<string, string>>({});

  const journalWeeks = useMemo(() => {
    if (!selectedLoop) {
      return [];
    }

    return buildJournalWeeks(selectedLoop.weeks, selectedLoop.exercises);
  }, [selectedLoop]);

  const handleToggleWeek = (week: number) => {
    setOpenWeek((currentWeek) => (currentWeek === week ? null : week));
  };

  const handleOpenTraining = (
    week: number,
    day: TrainingDay,
    exercises: TrainingExercise[],
  ) => {
    setSelectedTraining({
      week,
      day,
      exercises,
    });
  };

  const handleCloseTraining = () => {
    setSelectedTraining(null);
  };

  const handleSetResultChange = (resultKey: string, value: string) => {
    setSetResults((currentResults) => ({
      ...currentResults,
      [resultKey]: value,
    }));
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

        {selectedLoop ? (
          <JournalWeekList
            journalWeeks={journalWeeks}
            openWeek={openWeek}
            onToggleWeek={handleToggleWeek}
            onOpenTraining={handleOpenTraining}
          />
        ) : (
          <Card className="border border-dashed border-border bg-card/80 p-6 text-center text-sm text-muted-foreground">
            Select a loop on the second page to open the journal.
          </Card>
        )}
      </section>

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
