import { Modal } from "@/components/custom/Modal";
import { DatePicker } from "@/components/custom/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDayLabel } from "@/utils";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Fragment } from "react";
import { AgendaSkeleton } from "./LoaderAgenda";
import { useBook } from "./useBook";

const SIZE_SCROLLING_DAYS = 1;

// const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = Array.from({ length: 16 }, (_, i) => i + 8); // 8 AM to 11 PM

export default function WeeklyAgendaCard() {
  const {
    indexDay,
    setIndexDay,
    selectedDate,
    setSelectedDate,
    reserveSlot,
    daysList,
    getSlotType,
    loadingReservations,
  } = useBook();

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
              setSelectedDate(dayjs(selectedDate).subtract(1, "day").toDate());
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
                return (
                  <Fragment key={hour}>
                    <Modal
                      onConfirmButton={
                        <Button
                          onClick={() => {
                            if (slotType === "available")
                              reserveSlot(day.value, hour);
                          }}
                        >
                          Conferma
                        </Button>
                      }
                      title="Conferma prenotazione"
                      dialogTrigger={
                        <Button
                          disabled={
                            dayjs(day.value).isBefore(dayjs(), "day") ||
                            slotType === "reserved"
                          }
                          key={day.value}
                          variant={
                            slotType !== "available" ? "default" : "secondary"
                          }
                          color={slotType === "available" ? "green" : ""}
                          className={`h-10 w-full text-xs ${
                            slotType === "owned" ? "cursor-default" : ""
                          }`}
                          onClick={(e) => {
                            if (slotType === "reserved" || slotType === "owned")
                              e.preventDefault();
                          }}
                        >
                          {`${hour}:00`}
                        </Button>
                      }
                    >
                      {`Sei sicuro di voler confermare la tua prenotazione per ${hour}:00 di ${getDayLabel(
                        day.label
                      )}?`}
                    </Modal>
                  </Fragment>
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
  );
}
