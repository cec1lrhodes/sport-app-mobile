import type { ChangeEvent } from "react";

import { NativeSelect, NativeSelectOption } from "@/ui/native-select";

import type { TrainingDay } from "./loop_utils/createLoopTypes";

const weekOptions = Array.from({ length: 8 }, (_, index) => index + 1);
const dayOptions: TrainingDay[] = ["A", "B", "C"];

type TrainingScheduleSelectorProps = {
  selectedWeek: number;
  selectedDay: TrainingDay;
  onWeekChange: (week: number) => void;
  onDayChange: (day: TrainingDay) => void;
};

const TrainingScheduleSelector = ({
  selectedWeek,
  selectedDay,
  onWeekChange,
  onDayChange,
}: TrainingScheduleSelectorProps) => {
  const handleWeekChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onWeekChange(Number(event.target.value));
  };

  const handleDayChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onDayChange(event.target.value as TrainingDay);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <NativeSelect
        value={selectedWeek}
        onChange={handleWeekChange}
        className="w-full"
        aria-label="Select training week"
      >
        {weekOptions.map((week) => (
          <NativeSelectOption key={week} value={week}>
            Week {week}
          </NativeSelectOption>
        ))}
      </NativeSelect>

      <NativeSelect
        value={selectedDay}
        onChange={handleDayChange}
        className="w-full"
        aria-label="Select training day"
      >
        {dayOptions.map((day) => (
          <NativeSelectOption key={day} value={day}>
            Day {day}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
};

export default TrainingScheduleSelector;
