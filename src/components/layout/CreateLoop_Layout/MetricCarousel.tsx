import { useEffect, useState } from "react";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/ui/carousel";
import type { TrainingMetric } from "./loop_utils/createLoopTypes";

type MetricCarouselProps = {
  metric: TrainingMetric;
  value: number;
  values: number[];
  label: string;
  unit: string;
  onValueChange: (metric: TrainingMetric, value: number) => void;
};

const MetricCarousel = ({
  metric,
  value,
  values,
  label,
  unit,
  onValueChange,
}: MetricCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const selectedIndex = Math.max(values.indexOf(value), 0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.scrollTo(selectedIndex);
  }, [api, selectedIndex]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const handleSelect = () => {
      const selectedValue = values[api.selectedScrollSnap()];

      if (selectedValue === undefined) {
        return;
      }

      onValueChange(metric, selectedValue);
    };

    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api, metric, onValueChange, values]);

  return (
    <div className="text-center">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </p>
      <Carousel
        orientation="vertical"
        setApi={setApi}
        opts={{
          align: "center",
          startIndex: selectedIndex,
        }}
        aria-label={`Оберіть ${label.toLowerCase()}`}
        className="mt-2 h-37 rounded-xl bg-card shadow-2xl shadow-black/10 **:data-[slot=carousel-content]:h-full"
      >
        <CarouselContent className="mt-0 h-full">
          {values.map((optionValue, optionIndex) => (
            <CarouselItem
              key={optionValue}
              className="basis-12 pt-0"
              aria-label={`${optionValue} ${unit}`}
            >
              <div
                className={`flex h-12 items-center justify-center border-t border-border/70 text-2xl font-bold tabular-nums transition first:border-t-0 ${
                  optionIndex === selectedIndex
                    ? "text-foreground"
                    : "text-muted-foreground/45"
                }`}
              >
                {optionValue}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <p className="mt-2 text-[0.65rem] font-medium text-muted-foreground">
        {unit}
      </p>
    </div>
  );
};

export default MetricCarousel;
