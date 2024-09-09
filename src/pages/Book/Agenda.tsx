import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = Array.from({ length: 16 }, (_, i) => i + 8); // 8 AM to 11 PM

export default function WeeklyAgendaCard() {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Weekly Agenda</CardTitle>
        <CardDescription>
          Schedule your week with 1-hour time slots
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="grid grid-cols-8 gap-1">
          <div className="sticky left-0 bg-background z-10"></div>
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center font-semibold">
              {day}
            </div>
          ))}
          {timeSlots.map((hour) => (
            <React.Fragment key={hour}>
              <div className="sticky left-0 bg-background z-10 text-right pr-2 text-sm text-muted-foreground">
                {hour}:00
              </div>
              {daysOfWeek.map((day) => (
                <Button
                  key={`${day}-${hour}`}
                  variant="outline"
                  className="h-10 w-full text-xs"
                >
                  {`${hour}:00`}
                </Button>
              ))}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
