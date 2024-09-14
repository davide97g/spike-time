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
import { useReservationFindReservations } from "@/hooks/database/reservations/useReservationFindReservations";
import { useAuth } from "@/hooks/useAuth";
import dayjs from "dayjs";
import { Fragment, useCallback, useMemo, useState } from "react";
import { AgendaSkeleton } from "./LoaderAgenda";

const SIZE_SCROLLING_DAYS = 1;

// const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = Array.from({ length: 16 }, (_, i) => i + 8); // 8 AM to 11 PM

export default function WeeklyAgendaCard() {
  const [indexDay, setIndexDay] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const { mutateAsync: createReservation } = useReservationCreateReservation();
  const { user } = useAuth();
  const {
    data: reservations,
    isFetching: loadingReservations,
    refetch,
  } = useReservationFindReservations({
    dates: [
      dayjs(selectedDate).subtract(1, "day").format("YYYY-MM-DD"),
      dayjs(selectedDate).format("YYYY-MM-DD"),
      dayjs(selectedDate).add(1, "day").format("YYYY-MM-DD"),
    ],
  });

  const reserveSlot = (day: string, hour: number) => {
    createReservation({
      id: crypto.randomUUID(),
      date: dayjs(day).format("YYYY-MM-DD"),
      hourStart: hour,
      hourEnd: hour + 1,
      userId: user?.id,
    }).finally(() => refetch());
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

  const getSlotType = useCallback(
    (day: string, hour: number) => {
      const reservation = reservations?.find(
        (reservation) =>
          reservation.date === day && reservation.hourStart === hour
      );
      if (!reservation) return "available";
      if (reservation.userId === user?.id) return "owned";
      return "reserved";
    },
    [reservations, user]
  );

  if (loadingReservations) return <AgendaSkeleton />;

  return (
    <Card
      className="w-full max-w-4xl mt-2"
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
            disabled={dayjs(daysList[0].value).isBefore(dayjs(), "day")}
            onClick={() => {
              console.log({ daysList });

              if (dayjs(daysList[0].value).isBefore(dayjs(), "day")) return;
              setIndexDay(indexDay - SIZE_SCROLLING_DAYS);
            }}
          >
            Prev
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
                    disabled={
                      dayjs(day.value).isBefore(dayjs(), "day") ||
                      getSlotType(day.value, hour) === "reserved"
                    }
                    key={day.value}
                    variant={
                      getSlotType(day.value, hour) === "owned"
                        ? "default"
                        : "secondary"
                    }
                    color={
                      getSlotType(
                        dayjs(day.value).format("YYYY-MM-DD"),
                        hour
                      ) === "available"
                        ? "green"
                        : ""
                    }
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
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
