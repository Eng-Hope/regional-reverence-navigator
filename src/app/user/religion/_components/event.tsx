import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type ModelEvent = {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  startDate: string | null;
  endDate: string | null;
  location: string | null;
  description: string | null;
  religionId: number;
};

export default function Event({ event }: { event: ModelEvent }) {
    return (
      <Card key={event.id}>
        <CardHeader>
          <CardTitle>
            {event.name} {`( form ${event.startTime} to ${event.endTime} )`}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          <div className="mb-2">
            <Label className="text-xl">
              {event.startDate && `form ${event.startDate}`}
            </Label>
            <Label className="text-xl">
              {event.endDate && ` to ${event.endDate}`}
            </Label>
          </div>
          <div className="flex flex-col">
            <Label className="text-xl">
              {event.location && ` location: ${event.location}`}
            </Label>
            <Label className="mt-1 text-lg text-line">
              {event.description && ` form ${event.description}`}
            </Label>
          </div>
        </CardContent>
      </Card>
    );
}