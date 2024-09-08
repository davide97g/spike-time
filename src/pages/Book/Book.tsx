import { ChevronLeft, ChevronRight } from "@carbon/icons-react";
import { Button, useDisclosure } from "@nextui-org/react";
import dayjs from "dayjs";
import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import { TimeSlot } from "./TimeSlot";

const STARTING_HOUR = 8;
const ENDING_HOUR = 23;

const BookModal = lazy(() => import("./BookModal"));

export function Book() {
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onOpenChange: onOpenChangeModal,
  } = useDisclosure();

  const [selectedWeekStart, setSelectedWeekStart] = useState(
    dayjs().startOf("week")
  );

  const [selectedSlot, setSelectedSlot] = useState<{
    date: string;
    hour: number;
  }>();

  const selectedDaysList = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++)
      days.push(dayjs(selectedWeekStart).add(i, "day"));
    return days;
  }, [selectedWeekStart]);

  const dailyTimeSlots = useMemo(() => {
    const timeSlots = [];
    for (let i = STARTING_HOUR; i <= ENDING_HOUR; i++) timeSlots.push(i);
    return timeSlots;
  }, []);

  const busyTimeSlots = useMemo(() => {
    const busySlots = [
      { day: 3, hour: 10 },
      { day: 3, hour: 11 },
      { day: 4, hour: 9 },
      { day: 4, hour: 10 },
    ];

    return busySlots;
  }, []);

  const bookedTimeSlots = useMemo(() => {
    const bookedSlots = [
      { day: 2, hour: 9 },
      { day: 2, hour: 10 },
      { day: 2, hour: 11 },
      { day: 2, hour: 12 },
    ];

    return bookedSlots;
  }, []);

  const disableTimeSlots = useCallback((day: number, hour: number) => {
    return day === 5 || day === 6 || hour < STARTING_HOUR || hour > ENDING_HOUR;
  }, []);

  return (
    <div className="flex flex-col mt-4 gap-4 items-center">
      <div className="flex justify-between">
        <Button
          isIconOnly
          size="sm"
          onClick={() =>
            setSelectedWeekStart(dayjs(selectedWeekStart).subtract(1, "week"))
          }
          variant="ghost"
          startContent={<ChevronLeft />}
        />
        <Button
          isIconOnly
          size="sm"
          onClick={() =>
            setSelectedWeekStart(dayjs(selectedWeekStart).add(1, "week"))
          }
          variant="ghost"
          startContent={<ChevronRight />}
        />
      </div>

      <div className="flex gap-4">
        {selectedDaysList.map((day) => (
          <div
            key={day.toString()}
            className="flex flex-col items-center gap-1"
          >
            <div>{day.format("ddd")}</div>
            <div>{day.format("DD/MM")}</div>
            {
              /* Time slots for each day */
              dailyTimeSlots.map((hour) => (
                <TimeSlot
                  key={hour}
                  hour={hour}
                  disabled={disableTimeSlots(day.day(), hour)}
                  booked={bookedTimeSlots.some(
                    (slot) => slot.day === day.day() && slot.hour === hour
                  )}
                  busy={busyTimeSlots.some(
                    (slot) => slot.day === day.day() && slot.hour === hour
                  )}
                  onClick={() => {
                    if (!disableTimeSlots(day.day(), hour)) onOpenModal();
                    if (
                      busyTimeSlots.some(
                        (slot) => slot.day === day.day() && slot.hour === hour
                      )
                    )
                      console.log("Busy");
                    if (
                      bookedTimeSlots.some(
                        (slot) => slot.day === day.day() && slot.hour === hour
                      )
                    )
                      console.log("Booked");

                    console.log(day.format("ddd"), hour);
                    setSelectedSlot({
                      date: day.format("DD/MM"),
                      hour,
                    });
                    onOpenModal();
                  }}
                />
              ))
            }
          </div>
        ))}
      </div>

      <Suspense fallback={null}>
        {selectedSlot && (
          <BookModal
            slot={selectedSlot}
            isOpen={isOpenModal}
            onOpenChange={onOpenChangeModal}
          />
        )}
      </Suspense>
    </div>
  );
}
