import ProfilePage from "@/components/pages/ProfilePage";
import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
  return <ProfilePage />;
};

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});
