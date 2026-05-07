import { Button } from "@/ui/button";
import { ChartLine, Dumbbell } from "lucide-react";
import { useState } from "react";

interface ButtonProfile {
  name: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

const buttonsProfile: ButtonProfile[] = [
  {
    name: "Stastistics",
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
          aria-labelledby="rpe-heading"
          className="space-y-3 mt-10 bg-gray-600 h-20"
        >
          <h2 id="rpe-heading" className="text-2xl font-bold px-4">
            bla bla bla
          </h2>
        </section>

        <section
          aria-labelledby="rpe-heading"
          className="space-y-3 grid grid-cols-2 gap-2 "
        >
          {buttonsProfile.map((button) => (
            <Button
              key={button.name}
              variant="outline"
              className="w-full hover:bg-gray-500 h-10"
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
