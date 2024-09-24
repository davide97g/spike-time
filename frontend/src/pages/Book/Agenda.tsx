import { DatePicker } from "@/components/custom/DatePicker";
import { Modal } from "@/components/custom/Modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDayLabel, timeSlots } from "@/utils";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Fragment } from "react";
import { AgendaSkeleton } from "./LoaderAgenda";
import { useBook } from "./useBook";
import { Slot } from "@/components/custom/Slot";

export default function WeeklyAgendaCard() {
  const {
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
          onSelect={(date) => setSelectedDate(date)}
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
              if (dayjs(daysList[0].value).isBefore(dayjs(), "day")) return;
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
                        <Slot
                          slotType={slotType}
                          hour={`${hour}:00`}
                          day={day.value}
                        />
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
              setSelectedDate(dayjs(selectedDate).add(1, "day").toDate());
            }}
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
