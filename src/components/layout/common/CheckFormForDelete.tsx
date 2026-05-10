import { Button } from "@/ui/button";

type CheckFormForDeleteProps = {
  onDelete: () => void;
  deletedTitle: string;
  handleDeleteConfirm: () => void;
};

const CheckFormForDelete = ({
  onDelete,
  deletedTitle,
  handleDeleteConfirm,
}: CheckFormForDeleteProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={onDelete}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-loop-title"
        className="w-full max-w-xs rounded-3xl border border-border bg-card/95 p-6 text-center shadow-2xl shadow-black/40"
        onClick={(event) => event.stopPropagation()}
      >
        <h2
          id="delete-loop-title"
          className="text-2xl font-bold tracking-tight"
        >
          Are you sure ?
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          This will delete "{deletedTitle}" from your saved loops.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            className="border-border bg-background/60 hover:bg-background"
            onClick={onDelete}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-red-500 text-white shadow-lg shadow-red-950/30 hover:bg-red-600"
            onClick={handleDeleteConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckFormForDelete;
