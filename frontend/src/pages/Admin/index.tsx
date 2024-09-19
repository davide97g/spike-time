import { DatePicker } from "@/components/custom/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SIZE_SCROLLING_DAYS, timeSlots } from "@/utils";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBook } from "../Book/useBook";
import { useAdmin } from "./useAdmin";

export default function Admin() {
  const { daysList, getSlotType, setIndexDay, indexDay } = useBook();

  const { setSlotState, selectedDate, setSelectedDate, allReservations } =
    useAdmin();

  return (
    <div>
      <h1>Admin Page</h1>
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
                setSelectedDate(
                  dayjs(selectedDate).subtract(1, "day").toDate()
                );
              }}
              variant="ghost"
            >
              <ChevronLeft />
            </Button>
            {daysList.map((day) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
                key={day.value}
              >
                <div key={day.label} className="text-center font-semibold mb-2">
                  {day.label}
                </div>
                {timeSlots.map((hour) => {
                  const slotType = getSlotType(day.value, hour);
                  const reservation = allReservations?.find(
                    (res) => res.date === day.value && res.hourStart === hour
                  );
                  return (
                    <Button
                      // disabled={
                      //   dayjs(day.value).isBefore(dayjs(), "day") ||
                      //   slotType === "reserved"
                      // }
                      key={day.value}
                      variant={
                        slotType !== "available" ? "default" : "secondary"
                      }
                      color={slotType === "available" ? "green" : ""}
                      className={`h-10 w-full text-xs ${
                        slotType === "owned" ? "cursor-default" : ""
                      }`}
                      onClick={(e) => {
                        console.log("here1");

                        if (slotType === "reserved" || slotType === "owned")
                          e.preventDefault();
                        console.log("here2");

                        if (slotType === "available")
                          setSlotState(day.value, hour, true);

                        console.log("here3");

                        setSlotState(day.value, hour, false, reservation?.id);
                      }}
                    >
                      {`${hour}:00`}
                    </Button>
                  );
                })}
              </div>
            ))}
            <Button
              onClick={() => {
                setIndexDay((prev) => prev + SIZE_SCROLLING_DAYS);
                setSelectedDate(dayjs(selectedDate).add(1, "day").toDate());
              }}
              // className="absolute top-0 z-50"
              style={{ right: "-40px" }}
              variant="ghost"
            >
              <ChevronRight />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
