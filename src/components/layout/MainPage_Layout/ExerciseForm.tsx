import { type FormEvent, useState } from "react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";

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

const ExerciseForm = () => {
  const [exerciseValues, setExerciseValues] = useState(initialExerciseValues);

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
  };

  return (
    <section
      aria-labelledby="effort-heading"
      className="rounded-3xl bg-card/70 p-4 ring-1 ring-border"
    >
      <h2 id="effort-heading" className="sr-only">
        RPE inputs
      </h2>

      <Accordion type="single" collapsible className="space-y-3">
        {effortItems.map((item) => (
          <AccordionItem
            key={item.id}
            value={String(item.id)}
            className="rounded-2xl border-none bg-secondary/60 px-4 py-3 transition-colors not-last:border-b-0 hover:bg-secondary/80"
          >
            <AccordionTrigger className="py-0 text-base font-medium text-secondary-foreground hover:no-underline focus-visible:border-transparent focus-visible:ring-0">
              {item.name}
            </AccordionTrigger>

            <AccordionContent className="pb-0 ">
              <form
                className="mt-3 space-y-3 border-t border-border/60 pt-3"
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default ExerciseForm;
