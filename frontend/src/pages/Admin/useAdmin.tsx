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

  console.log({ allReservations });

  const setSlotState = (
    day: string,
    hour: number,
    isUnavailable: boolean,
    id?: string
  ) => {
    const reservation = allReservations?.find((res) => res.id === id);

    changeSlotState({
      id: reservation?.id ?? crypto.randomUUID(),
      date: dayjs(day).format("YYYY-MM-DD"),
      hourStart: hour,
      hourEnd: hour + 1,
      unavailable: isUnavailable,
    }).then(() => refetch());
  };

  return {
    setSlotState,
    selectedDate,
    setSelectedDate,
    allReservations,
  };
};
