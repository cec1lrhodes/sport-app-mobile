import { ChevronLeft } from "lucide-react";

import { Link } from "@tanstack/react-router";

const CreateLoopHeader = () => {
  return (
    <header className="flex items-center justify-between">
      <Link
        to="/second"
        aria-label="Back to library"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-accent"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </Link>
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
        Create training loop
      </p>
    </header>
  );
};

export default CreateLoopHeader;
