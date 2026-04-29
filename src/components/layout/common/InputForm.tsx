import type { ComponentProps } from "react";

import { Input } from "@/ui/input";
import { Button } from "@/ui/button";

type InputFormProps = {
  title: string;
  description: string;
  value: string;
  placeholder: string;
  inputAriaLabel: string;
  cancelLabel: string;
  submitLabel: string;
  submitAriaLabel: string;
  cancelAriaLabel: string;
  disabled: boolean;
  onSubmit: NonNullable<ComponentProps<"form">["onSubmit"]>;
  onChange: NonNullable<ComponentProps<"input">["onChange"]>;
  onCancel: () => void;
};

export const InputForm = ({
  title,
  description,
  value,
  placeholder,
  inputAriaLabel,
  cancelLabel,
  submitLabel,
  submitAriaLabel,
  cancelAriaLabel,
  disabled,
  onSubmit,
  onChange,
  onCancel,
}: InputFormProps) => {
  const titleId = "input-form-title";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-md"
      role="presentation"
    >
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-950/85 p-5 shadow-2xl shadow-black/40"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="space-y-2">
          <p id={titleId} className="text-lg font-semibold text-white">
            {title}
          </p>
          <p className="text-sm leading-6 text-zinc-400">{description}</p>
        </div>

        <Input
          value={value}
          onChange={onChange}
          className="mt-5 h-12 border-white/15 bg-white/10 text-white placeholder:text-zinc-500 focus-visible:border-white/40 focus-visible:ring-white/20"
          placeholder={placeholder}
          autoFocus
          aria-label={inputAriaLabel}
        />

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="h-11 rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            aria-label={cancelAriaLabel}
          >
            {cancelLabel}
          </Button>
          <Button
            type="submit"
            disabled={disabled}
            className="h-11 rounded-xl bg-white text-black hover:bg-white/90"
            aria-label={submitAriaLabel}
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
};
