import { useChangeSlotState } from "@/hooks/database/admin/useChangeSlotState";
import { useReservationFindReservations } from "@/hooks/database/reservations/useReservationFindReservations";
import dayjs from "dayjs";
import { useState } from "react";

export const useAdmin = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { mutateAsync: changeSlotState } = useChangeSlotState();
  const { refetch, data: allReservations } = useReservationFindReservations({
    dates: [
      dayjs(selectedDate).subtract(1, "day").format("YYYY-MM-DD"),
      dayjs(selectedDate).format("YYYY-MM-DD"),
      dayjs(selectedDate).add(1, "day").format("YYYY-MM-DD"),
    ],
  });

  const makeSlotUnavailable = (day: string, hour: number) => {
    changeSlotState({
      id: crypto.randomUUID(),
      date: dayjs(day).format("YYYY-MM-DD"),
      hourStart: hour,
      hourEnd: hour + 1,
      unavailable: true,
    }).then(() => refetch());
  };

  return {
    makeSlotUnavailable,
    selectedDate,
    setSelectedDate,
    allReservations,
  };
};
