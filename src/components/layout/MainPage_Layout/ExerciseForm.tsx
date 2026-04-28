import type { FormEvent } from "react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { cn } from "@/lib/utils";
import type {
  ExerciseField,
  ExerciseFormItem,
  ExerciseId,
} from "@/types/exerciseFormTypes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";

type ExerciseFormProps = {
  exercises: ExerciseFormItem[];
  onExerciseValueChange: (
    id: ExerciseId,
    field: ExerciseField,
    value: string,
  ) => void;
  onExerciseConfirm: (id: ExerciseId) => void;
};

const ExerciseForm = ({
  exercises,
  onExerciseValueChange,
  onExerciseConfirm,
}: ExerciseFormProps) => {
  const handleExerciseSubmit = (
    event: FormEvent<HTMLFormElement>,
    id: ExerciseId,
  ) => {
    event.preventDefault();
    onExerciseConfirm(id);
  };

  return (
    <section
      aria-labelledby="effort-heading"
      className="rounded-3xl bg-card/70 p-4 ring-1 ring-border "
    >
      <h2 id="effort-heading" className="sr-only">
        RPE inputs
      </h2>

      <Accordion type="single" collapsible className="space-y-3">
        {exercises.map((item) => (
          <AccordionItem
            key={item.id}
            value={String(item.id)}
            className="rounded-2xl border-none bg-secondary/60 px-4 py-3 transition-colors not-last:border-b-0 hover:bg-secondary/80"
          >
            <AccordionTrigger
              className={cn(
                "py-0 text-base font-medium text-secondary-foreground hover:no-underline focus-visible:border-transparent focus-visible:ring-0",
                item.isConfirmed && "text-green-400",
              )}
            >
              {item.name}
            </AccordionTrigger>

            <AccordionContent className="pb-0 ">
              <form
                className="mt-3 space-y-3 border-t border-border/60 pt-3"
                onSubmit={(event) => handleExerciseSubmit(event, item.id)}
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
                    value={item.values.kg}
                    onChange={(event) =>
                      onExerciseValueChange(item.id, "kg", event.target.value)
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
                    value={item.values.reps}
                    onChange={(event) =>
                      onExerciseValueChange(item.id, "reps", event.target.value)
                    }
                  />
                </label>

                <Button
                  className="h-10 w-full"
                  disabled={item.isConfirmDisabled}
                  type="submit"
                >
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
