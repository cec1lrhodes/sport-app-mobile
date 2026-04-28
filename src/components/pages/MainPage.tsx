import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { type FormEvent, useState } from "react";

const effortItems = [
  { name: "Bench Press", id: 1 },
  { name: "Squat", id: 2 },
  { name: "Pull-Ups", id: 3 },
] as const;

type ExerciseId = (typeof effortItems)[number]["id"];
type ExerciseField = "kg" | "reps";
type ExerciseValues = Record<ExerciseId, Record<ExerciseField, string>>;

const initialExerciseValues: ExerciseValues = {
  1: { kg: "", reps: "" },
  2: { kg: "", reps: "" },
  3: { kg: "", reps: "" },
};

function MainPage() {
  const [exerciseValues, setExerciseValues] = useState(initialExerciseValues);
  const [isExerciseOpen, setIsExerciseOpen] = useState<ExerciseId | null>(null);

  const handleExerciseOpen = (id: ExerciseId) => {
    setIsExerciseOpen(isExerciseOpen === id ? null : id);
  };

  const handleExerciseValueChange = (
    id: ExerciseId,
    field: ExerciseField,
    value: string,
  ) => {
    setExerciseValues((currentValues) => ({
      ...currentValues,
      [id]: {
        ...currentValues[id],
        [field]: value,
      },
    }));
  };

  const handleExerciseConfirm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsExerciseOpen(null);
  };

  return (
    <main className="min-h-screen bg-background px-4 pb-24 pt-8 text-foreground">
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-sm flex-col gap-7">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            FIND YOUR LIMITS
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Training Loop</h1>
        </header>

        <section
          aria-labelledby="effort-heading"
          className="rounded-3xl bg-card/70 p-4 ring-1 ring-border"
        >
          <h2 id="effort-heading" className="sr-only">
            RPE inputs
          </h2>

          <div className="space-y-3">
            {effortItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-secondary/60 px-4 py-3 transition-colors hover:bg-secondary/80"
              >
                <button
                  type="button"
                  aria-expanded={isExerciseOpen === item.id}
                  aria-controls={`exercise-form-${item.id}`}
                  className="flex w-full items-center justify-between text-left text-base font-medium text-secondary-foreground"
                  onClick={() => handleExerciseOpen(item.id)}
                >
                  <span>{item.name}</span>
                </button>

                {isExerciseOpen === item.id && (
                  <form
                    id={`exercise-form-${item.id}`}
                    className="mt-4 space-y-3 border-t border-border/60 pt-4"
                    onSubmit={handleExerciseConfirm}
                  >
                    <label className="grid gap-2 text-sm font-medium text-secondary-foreground">
                      kg
                      <Input
                        aria-label={`${item.name} kg`}
                        className="h-10 border-border bg-background"
                        inputMode="decimal"
                        min={0}
                        placeholder="0"
                        type="number"
                        value={exerciseValues[item.id].kg}
                        onChange={(event) =>
                          handleExerciseValueChange(
                            item.id,
                            "kg",
                            event.target.value,
                          )
                        }
                      />
                    </label>

                    <label className="grid gap-2 text-sm font-medium text-secondary-foreground">
                      reps
                      <Input
                        aria-label={`${item.name} reps`}
                        className="h-10 border-border bg-background"
                        inputMode="numeric"
                        min={0}
                        placeholder="0"
                        type="number"
                        value={exerciseValues[item.id].reps}
                        onChange={(event) =>
                          handleExerciseValueChange(
                            item.id,
                            "reps",
                            event.target.value,
                          )
                        }
                      />
                    </label>

                    <Button className="h-10 w-full" type="submit">
                      confirm
                    </Button>
                  </form>
                )}
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="rpe-heading" className="space-y-3">
          <h2 id="rpe-heading" className="text-2xl font-bold">
            What is RPE ?
          </h2>

          <Card className="border border-border bg-card/90 shadow-2xl shadow-black/20">
            <CardHeader>
              <CardTitle>Rate of Perceived Exertion</CardTitle>
              <CardDescription>
                RPE helps you track how hard a set or workout feels.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                Choose a number from 0 to 10, where 0 feels like complete rest
                and 10 feels like your maximum possible effort.
              </p>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="rpe-heading" className="space-y-3">
          <h2 id="rpe-heading" className="text-2xl font-bold text-orange-500">
            How to choose the right RPE ?
          </h2>

          <Card className="border border-border bg-card/90 shadow-2xl shadow-black/20">
            <CardHeader>
              <CardTitle>Rate of Perceived Exertion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                you need bla-bla-bla...
              </p>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="rpe-heading" className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            YOU can ask your trainer
          </p>

          <Card className="border border-border bg-card/90 shadow-2xl shadow-black/20">
            <CardContent>
              <Input
                className="h-15 w-full border-border bg-background text-center text-lg font-semibold"
                placeholder="Ask your trainer..."
              />
            </CardContent>
          </Card>
        </section>
      </section>
    </main>
  );
}

export default MainPage;
