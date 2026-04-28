import ThirdPage from "@/components/pages/ThirdPage";
import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
  return <ThirdPage />;
};

export const Route = createFileRoute("/third")({
  component: RouteComponent,
});
