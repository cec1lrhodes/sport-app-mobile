export type TrainingExercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

export type TrainingMetric = "sets" | "reps" | "weight";

export type TrainingMetrics = Record<TrainingMetric, number>;

type MetricConfig = {
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
};

export const metricConfig: Record<TrainingMetric, MetricConfig> = {
  sets: {
    label: "Sets",
    unit: "sets",
    min: 1,
    max: 10,
    step: 1,
  },
  reps: {
    label: "Reps",
    unit: "reps",
    min: 1,
    max: 30,
    step: 1,
  },
  weight: {
    label: "Weight",
    unit: "kg",
    min: 0,
    max: 200,
    step: 2.5,
  },
};

const createMetricValues = ({ min, max, step }: MetricConfig) => {
  const values: number[] = [];

  for (let currentValue = min; currentValue <= max; ) {
    values.push(currentValue);
    currentValue = Number((currentValue + step).toFixed(2));
  }

  return values;
};

export const metricValueOptions: Record<TrainingMetric, number[]> = {
  sets: createMetricValues(metricConfig.sets),
  reps: createMetricValues(metricConfig.reps),
  weight: createMetricValues(metricConfig.weight),
};

export const formatExerciseLine = (exercise: TrainingExercise) =>
  `${exercise.name} ${exercise.sets} cycle, ${exercise.reps} reps, ${exercise.weight} kg`;
