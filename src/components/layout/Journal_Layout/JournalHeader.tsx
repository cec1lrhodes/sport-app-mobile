type JournalHeaderProps = {
  title?: string;
  weeks?: number;
};

const JournalHeader = ({ title, weeks }: JournalHeaderProps) => {
  return (
    <header className="space-y-2">
      <h1 className="text-4xl font-bold tracking-tight">Journal</h1>
      {title && weeks ? (
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
          {title} · {weeks} weeks
        </p>
      ) : null}
    </header>
  );
};

export default JournalHeader;
