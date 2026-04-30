import { Link } from "@tanstack/react-router";
import { type KeyboardEvent } from "react";

import { Button } from "@/ui/button";
import { useLoopsStore } from "@/store/useLoopsStore";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";

const SecondPage = () => {
  const loops = useLoopsStore((state) => state.loops);
  const selectedLoopId = useLoopsStore((state) => state.selectedLoopId);
  const setSelectedLoopId = useLoopsStore((state) => state.setSelectedLoopId);

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
                  "cursor-pointer border border-border bg-card/90 shadow-2xl shadow-black/20 transition hover:border-primary/50 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70",
                  isSelected &&
                    "border-primary bg-primary/10 shadow-primary/20 ring-2 ring-primary/60",
                )}
              >
                <CardHeader>
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
