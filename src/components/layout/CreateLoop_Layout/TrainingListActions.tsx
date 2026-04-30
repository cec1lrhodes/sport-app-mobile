import { Check } from "lucide-react";

import { Button } from "@/ui/button";

type TrainingListActionsProps = {
  isNameSet: boolean;
  isConfirmed: boolean;
  hasExercises: boolean;
  onSetName: () => void;
  onConfirm: () => void;
};

const TrainingListActions = ({
  isNameSet,
  isConfirmed,
  hasExercises,
  onSetName,
  onConfirm,
}: TrainingListActionsProps) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      <Button
        type="button"
        onClick={onSetName}
        className="relative h-12 overflow-hidden rounded-xl bg-white text-base font-semibold text-black hover:bg-white/90"
        aria-label={isNameSet ? "Program name set" : "Set program name"}
      >
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isNameSet ? "-translate-y-3 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          Set Name
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isNameSet ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
          aria-hidden={!isNameSet}
        >
          <Check className="size-6" aria-hidden="true" />
        </span>
      </Button>

      <Button
        type="button"
        onClick={onConfirm}
        disabled={!hasExercises && !isConfirmed}
        className={`relative h-12 overflow-hidden rounded-xl bg-emerald-400/70 text-base font-semibold text-black hover:bg-emerald-500 ${
          isConfirmed ? "disabled:opacity-100" : ""
        }`}
        aria-label={
          isConfirmed ? "Program confirmed" : "Confirm created program"
        }
      >
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isConfirmed
              ? "-translate-y-3 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          Confirm
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isConfirmed ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
          aria-hidden={!isConfirmed}
        >
          <Check className="size-6" aria-hidden="true" />
        </span>
      </Button>
    </div>
  );
};

export default TrainingListActions;
