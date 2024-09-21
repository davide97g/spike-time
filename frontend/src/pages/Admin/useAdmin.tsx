import { useReservationCreateReservationAdmin } from "@/hooks/database/reservations/useReservationCreateReservationAdmin";
import { useReservationDeleteReservationAdmin } from "@/hooks/database/reservations/useReservationDeleteReservationAdmin";
import { useReservationFindReservations } from "@/hooks/database/reservations/useReservationFindReservations";
import dayjs from "dayjs";
import { useState } from "react";

export const useAdmin = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { mutateAsync: createReservationAdmin } =
    useReservationCreateReservationAdmin();
  const { mutateAsync: deleteReservationAdmin } =
    useReservationDeleteReservationAdmin();
  const { refetch, data: allReservations } = useReservationFindReservations({
    dates: [
      dayjs(selectedDate).subtract(1, "day").format("YYYY-MM-DD"),
      dayjs(selectedDate).format("YYYY-MM-DD"),
      dayjs(selectedDate).add(1, "day").format("YYYY-MM-DD"),
    ],
  });

  return {
    createReservationAdmin,
    deleteReservationAdmin,
    refetch,
    selectedDate,
    setSelectedDate,
    allReservations,
  };
};
