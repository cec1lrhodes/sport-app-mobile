import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Input } from "@/ui/input";
import ExerciseForm from "@/components/layout/MainPage_Layout/ExerciseForm";

function MainPage() {
  return (
    <main className="min-h-screen bg-background px-4 pb-24 pt-8 text-foreground">
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-sm flex-col gap-7">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            FIND YOUR LIMITS
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Training Loop</h1>
        </header>

        <ExerciseForm />

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
