import MetricCarousel from "./MetricCarousel";
import {
  metricConfig,
  metricValueOptions,
  type TrainingMetric,
  type TrainingMetrics,
} from "./createLoopTypes";

type MetricsSelectorProps = {
  trainingMetrics: TrainingMetrics;
  onMetricValueChange: (metric: TrainingMetric, value: number) => void;
};

const MetricsSelector = ({
  trainingMetrics,
  onMetricValueChange,
}: MetricsSelectorProps) => {
  return (
    <section
      aria-label="Training exercise metrics"
      className="grid grid-cols-3 gap-2 border-y border-border py-4"
    >
      {Object.entries(metricConfig).map(([metric, config]) => (
        <MetricCarousel
          key={metric}
          metric={metric as TrainingMetric}
          value={trainingMetrics[metric as TrainingMetric]}
          values={metricValueOptions[metric as TrainingMetric]}
          label={config.label}
          unit={config.unit}
          onValueChange={onMetricValueChange}
        />
      ))}
    </section>
  );
};

export default MetricsSelector;
