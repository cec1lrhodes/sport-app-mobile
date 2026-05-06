import React from "react";

const ProfilePage = () => {
  return (
    <main className="min-h-screen bg-background px-4 pb-24 pt-8 text-foreground">
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-sm flex-col gap-7">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            CHECK YOUR PROGRESS
          </p>
          <h1 className="text-3xl font-bold tracking-tight">MY PROFILE</h1>
        </header>

        <section aria-labelledby="rpe-heading" className="space-y-3 mt-10">
          <h2 id="rpe-heading" className="text-2xl font-bold">
            bla bla bla
          </h2>
        </section>

        <section aria-labelledby="rpe-heading" className="space-y-3">
          <h2 id="rpe-heading" className="text-2xl font-bold text-orange-500">
            bla bla bla
          </h2>
        </section>

        <section aria-labelledby="rpe-heading" className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            bla bla
          </p>
        </section>
      </section>
    </main>
  );
};

export default ProfilePage;
