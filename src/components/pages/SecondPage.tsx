import { Link } from "@tanstack/react-router";
import { type KeyboardEvent, useState } from "react";

import { Button } from "@/ui/button";
import { type LoopCard, useLoopsStore } from "@/store/useLoopsStore";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { X } from "lucide-react";

const SecondPage = () => {
  const loops = useLoopsStore((state) => state.loops);
  const selectedLoopId = useLoopsStore((state) => state.selectedLoopId);
  const setSelectedLoopId = useLoopsStore((state) => state.setSelectedLoopId);
  const deleteLoop = useLoopsStore((state) => state.deleteLoop);
  const [loopToDelete, setLoopToDelete] = useState<LoopCard | null>(null);

  const handleLoopSelect = (loopId: number) => {
    setSelectedLoopId(loopId);
  };

  const handleLoopKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    loopId: number,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    handleLoopSelect(loopId);
  };

  const handleDeleteConfirm = () => {
    if (!loopToDelete) {
      return;
    }

    deleteLoop(loopToDelete.id);
    setLoopToDelete(null);
  };

  return (
    <main className="min-h-screen bg-background px-4 pb-36 pt-8 text-foreground">
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-sm flex-col gap-7">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            Program builder
          </p>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Set Your Program
            </h1>
            <p className="text-sm leading-6 text-muted-foreground">
              Select a saved training cycle or create a new program from your
              own exercises.
            </p>
          </div>
        </header>

        <section
          aria-labelledby="current-program-heading"
          className="space-y-3"
        >
          <p
            id="current-program-heading"
            className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground"
          >
            loops
          </p>

          {loops.map((loop) => {
            const isSelected = selectedLoopId === loop.id;

            return (
              <Card
                key={loop.id}
                role="button"
                tabIndex={0}
                aria-label={`Select ${loop.title} program`}
                aria-pressed={isSelected}
                onClick={() => handleLoopSelect(loop.id)}
                onKeyDown={(event) => handleLoopKeyDown(event, loop.id)}
                className={cn(
                  "relative cursor-pointer border border-border bg-card/50 shadow-2xl shadow-black/20 transition hover:border-white/50 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                  isSelected &&
                    "border-white bg-white/5 shadow-white/15 ring-2 ring-white/60",
                )}
              >
                <button
                  type="button"
                  aria-label={`Delete ${loop.title} program`}
                  onClick={(event) => {
                    event.stopPropagation();
                    setLoopToDelete(loop);
                  }}
                  className="absolute right-3 top-3 inline-flex h-8 items-center gap-1 rounded-full border border-border bg-background/95 px-3 text-sm font-medium text-foreground shadow-md shadow-black/10 transition hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Delete <X className="size-5" />
                </button>

                <CardHeader className="pr-32">
                  <CardTitle>{loop.title}</CardTitle>
                  <CardDescription>{loop.createdAt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-background/70 p-3 text-center">
                    <div>
                      <p className="text-lg font-bold">{loop.exercisesCount}</p>
                      <p className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">
                        Exercises
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{loop.weeks}</p>
                      <p className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">
                        Weeks
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {loopToDelete && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
            onClick={() => setLoopToDelete(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-loop-title"
              className="w-full max-w-xs rounded-3xl border border-border bg-card/95 p-6 text-center shadow-2xl shadow-black/40"
              onClick={(event) => event.stopPropagation()}
            >
              <h2
                id="delete-loop-title"
                className="text-2xl font-bold tracking-tight"
              >
                Are you sure ?
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                This will delete "{loopToDelete.title}" from your saved loops.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="border-border bg-background/60 hover:bg-background"
                  onClick={() => setLoopToDelete(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="bg-red-500 text-white shadow-lg shadow-red-950/30 hover:bg-red-600"
                  onClick={handleDeleteConfirm}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}

        <Button
          asChild
          variant="outline"
          className="fixed bottom-20 left-1/2 z-20 h-12 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 border-blue-400/40 bg-blue-500/15 text-base font-semibold text-blue-200 shadow-2xl shadow-blue-950/30 backdrop-blur-md hover:bg-blue-500/25 hover:text-blue-100"
          aria-label="Create new training program"
        >
          <Link to="/create-loop">Create New Programm</Link>
        </Button>
      </section>
    </main>
  );
};

export default SecondPage;
