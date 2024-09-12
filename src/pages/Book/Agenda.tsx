import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";
import { Fragment, useMemo, useState } from "react";

// const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = Array.from({ length: 16 }, (_, i) => i + 8); // 8 AM to 11 PM

export default function WeeklyAgendaCard() {
  const [indexDay, setIndexDay] = useState<number>(0);

  const daysList = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => dayjs().add(i + indexDay, "day")).map(
        (day) => ({
          value: day.format("YYYY-MM-DD"),
          label: `${day.format("dddd").slice(0, 3)} ${day.format("D")}`,
        })
      ),
    [indexDay]
  );

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Weekly Agenda</CardTitle>
        <CardDescription>
          Schedule your week with 1-hour time slots
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto w-500">
        <div className="grid grid-cols-4 gap-1 relative">
          <Button
            className="absolute top-0 left-6 z-50"
            onClick={() => {
              if (indexDay > 0) setIndexDay(indexDay - 3);
            }}
          >
            prev
          </Button>
          <div className="sticky left-0 bg-background z-10"></div>
          {daysList.map((day) => (
            <div key={day.label} className="text-center font-semibold mb-2">
              {day.label}
            </div>
          ))}
          <Button
            onClick={() => setIndexDay((prev) => prev + 3)}
            className="absolute top-0 z-50"
            style={{ right: "-40px" }}
          >
            next
          </Button>

          {timeSlots.map((hour) => (
            <Fragment key={hour}>
              <div className="sticky left-0 bg-background z-10 text-right pr-2 text-sm text-muted-foreground">
                {hour}:00
              </div>
              {daysList.map((day) => (
                <Button
                  key={day.value}
                  variant="outline"
                  className="h-10 w-full text-xs"
                  onClick={() => console.log(day.value, hour)}
                >
                  {`${hour}:00`}
                </Button>
              ))}
            </Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
