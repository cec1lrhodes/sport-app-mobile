import { Link } from "@tanstack/react-router";

import { Button } from "@/ui/button";
import { useLoopsStore } from "@/store/useLoopsStore";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";

const SecondPage = () => {
  const loops = useLoopsStore((state) => state.loops);

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

          {loops.map((loop) => (
            <Card
              key={loop.id}
              className="border border-border bg-card/90 shadow-2xl shadow-black/20"
            >
              <CardHeader>
                <CardTitle>{loop.title}</CardTitle>
                <CardDescription>{loop.description}</CardDescription>
                <CardAction>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                    {loop.status}
                  </span>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 rounded-xl border border-border bg-background/70 p-3 text-center">
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
                  <div>
                    <p className="text-lg font-bold">{loop.target}</p>
                    <p className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">
                      Target
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
