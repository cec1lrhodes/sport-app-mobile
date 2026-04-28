import CreateLoop from "@/components/pages/CreateLoop";
import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
  return <CreateLoop />;
};

export const Route = createFileRoute("/create-loop")({
  component: RouteComponent,
});
