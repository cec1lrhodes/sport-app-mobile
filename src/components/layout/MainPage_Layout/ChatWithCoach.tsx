import { Card, CardContent } from "@/ui/card";
import { Input } from "@/ui/input";

export const ChatWithCoach = () => {
  return (
    <Card className="border border-border bg-card/90 shadow-2xl shadow-black/20">
      <CardContent>
        <Input
          className="h-15 w-full border-border bg-background text-center text-lg font-semibold"
          placeholder="Ask your trainer..."
        />
      </CardContent>
    </Card>
  );
};
