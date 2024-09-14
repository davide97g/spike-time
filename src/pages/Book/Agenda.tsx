import { DatePicker } from "@/components/custom/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useReservationCreateReservation } from "@/hooks/database/reservations/useReservationCreateReservation";
import { useAuth } from "@/hooks/useAuth";
import dayjs from "dayjs";
import { Fragment, useMemo, useState } from "react";

const SIZE_SCROLLING_DAYS = 1;

// const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = Array.from({ length: 16 }, (_, i) => i + 8); // 8 AM to 11 PM

export default function WeeklyAgendaCard() {
  const [indexDay, setIndexDay] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const { mutateAsync: createReservation } = useReservationCreateReservation();
  const { user } = useAuth();

  const reserveSlot = (day: string, hour: number) => {
    createReservation({
      id: crypto.randomUUID(),
      date: dayjs(day).format("YYYY-MM-DD"),
      hourStart: hour,
      hourEnd: hour + 1,
      userId: user?.id,
    });
  };

  const daysList = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) =>
        // with -1 the central day is today
        dayjs(selectedDate).add(i + indexDay - 1, "day")
      ).map((day) => ({
        value: day.format("YYYY-MM-DD"),
        label: `${day.format("dddd").slice(0, 3)} ${day.format("D")}`,
      })),
    [indexDay, selectedDate]
  );

  return (
    <Card
      className="w-full max-w-4xl"
      style={{ maxHeight: "800px", overflowY: "auto" }}
    >
      <CardHeader className="flex-col items-center">
        <CardTitle>Weekly Agenda</CardTitle>
        <CardDescription>
          Schedule your week with 1-hour time slots
        </CardDescription>
        <DatePicker
          selectedDate={selectedDate}
          onSelect={(date) => {
            setIndexDay(0);
            setSelectedDate(date);
          }}
        />
      </CardHeader>
      <CardContent className="overflow-x-auto w-500">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Button
            onClick={() => {
              console.log({ daysList });

              if (dayjs(daysList[0].value).isBefore(dayjs(), "day")) return;
              setIndexDay(indexDay - SIZE_SCROLLING_DAYS);
            }}
          >
            prev
          </Button>
          {daysList.map((day) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div key={day.label} className="text-center font-semibold mb-2">
                {day.label}
              </div>
              {timeSlots.map((hour) => (
                <Fragment key={hour}>
                  <Button
                    disabled={dayjs(day.value).isBefore(dayjs(), "day")}
                    key={day.value}
                    variant="outline"
                    className="h-10 w-full text-xs"
                    onClick={() => {
                      reserveSlot(day.value, hour);
                    }}
                  >
                    {`${hour}:00`}
                  </Button>
                </Fragment>
              ))}
            </div>
          ))}
          <Button
            onClick={() => setIndexDay((prev) => prev + SIZE_SCROLLING_DAYS)}
            // className="absolute top-0 z-50"
            style={{ right: "-40px" }}
          >
            next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
