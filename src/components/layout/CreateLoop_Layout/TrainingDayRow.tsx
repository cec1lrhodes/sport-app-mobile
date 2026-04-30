import type {
  TrainingDay,
  TrainingExercise,
} from "./loop_utils/createLoopTypes";
import TrainingExerciseItem from "./TrainingExerciseItem";

type TrainingDayRowProps = {
  day: TrainingDay;
  exercises: TrainingExercise[];
  onRemoveExercise: (exerciseId: number) => void;
};

const TrainingDayRow = ({
  day,
  exercises,
  onRemoveExercise,
}: TrainingDayRowProps) => {
  return (
    <div className="flex items-start gap-2">
      <span className="w-5 shrink-0">{day}.</span>

      {exercises.length > 0 ? (
        <div className="flex flex-1 flex-col gap-2">
          {exercises.map((exercise) => (
            <TrainingExerciseItem
              key={exercise.id}
              exercise={exercise}
              onRemoveExercise={onRemoveExercise}
            />
          ))}
        </div>
      ) : (
        <span className="sr-only">No exercises added for day {day}</span>
      )}
    </div>
  );
};

export default TrainingDayRow;
