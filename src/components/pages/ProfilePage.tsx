import { Button } from "@/ui/button";
import { ChartLine, Dumbbell } from "lucide-react";
import { useState } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface ButtonProfile {
  name: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

const buttonsProfile: ButtonProfile[] = [
  {
    name: "Statistics",
    icon: <ChartLine className="size-5 text-white" />,
    content: (
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
        bla bla
      </p>
    ),
  },
  {
    name: "Exercises",
    icon: <Dumbbell className="size-5 text-white" />,
    content: (
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
        bla bla2
      </p>
    ),
  },
  {
    name: "TEST3",
    icon: <Dumbbell className="size-5 text-white" />,
    content: (
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
        bla bla3
      </p>
    ),
  },
  {
    name: "TEST4",
    icon: <Dumbbell className="size-5 text-white" />,
    content: (
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
        bla bla4
      </p>
    ),
  },
];

const chartData = [
  { day: "Mon", volume: 42, workouts: 2 },
  { day: "Tue", volume: 58, workouts: 3 },
  { day: "Wed", volume: 48, workouts: 2 },
  { day: "Thu", volume: 76, workouts: 4 },
  { day: "Fri", volume: 64, workouts: 3 },
  { day: "Sat", volume: 92, workouts: 5 },
  { day: "Sun", volume: 70, workouts: 4 },
];

const chartConfig = {
  volume: {
    label: "Training volume",
    color: "#2f7df6",
  },
  workouts: {
    label: "Workouts",
    color: "#7dd3fc",
  },
} satisfies ChartConfig;

const ProfilePage = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleClickButton = (button: string) => {
    setActiveButton(button);
  };

  return (
    <main className="min-h-screen bg-background px-4 pb-24 pt-8 text-foreground">
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-sm flex-col gap-7">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            CHECK YOUR PROGRESS
          </p>
          <h1 className="text-3xl font-bold tracking-tight">MY PROFILE</h1>
        </header>

        <section
          aria-labelledby="progress-heading"
          className="rounded-3xl border border-white/10 bg-white/3 p-4 shadow-2xl shadow-primary/10 backdrop-blur"
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p
                id="progress-heading"
                className="text-xs font-semibold uppercase tracking-[0.26em] text-primary"
              >
                Weekly progress
              </p>
              <h2 className="mt-1 text-lg font-bold">Training dynamics</h2>
            </div>
            <div className="rounded-2xl bg-primary/15 px-3 py-2 text-right">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Total
              </p>
              <p className="text-xl font-bold text-primary">450</p>
            </div>
          </div>

          <ChartContainer
            config={chartConfig}
            className="h-[190px] w-full [&_.recharts-cartesian-axis-tick_text]:text-[11px]"
          >
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{ left: -18, right: 10, top: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-volume)"
                    stopOpacity={0.55}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-volume)"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="rgba(255,255,255,0.08)"
                strokeDasharray="4 6"
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />
              <YAxis hide domain={[0, 100]} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="var(--color-volume)"
                strokeWidth={3}
                fill="url(#volumeGradient)"
                dot={{ r: 4, fill: "var(--color-volume)", strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </AreaChart>
          </ChartContainer>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-2xl bg-background/70 px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Streak
              </p>
              <p className="font-semibold">7 days</p>
            </div>
            <div className="rounded-2xl bg-background/70 px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Best
              </p>
              <p className="font-semibold">Sat</p>
            </div>
            <div className="rounded-2xl bg-background/70 px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Avg
              </p>
              <p className="font-semibold">64</p>
            </div>
          </div>
        </section>

        <section
          aria-label="Profile sections"
          className="grid grid-cols-2 gap-3"
        >
          {buttonsProfile.map((button) => (
            <Button
              key={button.name}
              variant="outline"
              className="h-12 w-full justify-start gap-2 rounded-2xl border-white/10 bg-white/3 px-4 hover:bg-primary/15"
              onClick={() => handleClickButton(button.name)}
            >
              {button.icon}
              {button.name}
            </Button>
          ))}
        </section>

        <section aria-labelledby="rpe-heading" className="space-y-3">
          {activeButton === null
            ? null
            : buttonsProfile.find((button) => button.name === activeButton)
                ?.content}
        </section>
      </section>
    </main>
  );
};

export default ProfilePage;
