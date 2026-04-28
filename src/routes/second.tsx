import SecondPage from "@/components/pages/SecondPage";
import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
  return <SecondPage />;
};

export const Route = createFileRoute("/second")({
  component: RouteComponent,
});
