import { useReservationCreateReservationAdmin } from "@/hooks/database/reservations/useReservationCreateReservationAdmin";
import { useReservationDeleteReservationAdmin } from "@/hooks/database/reservations/useReservationDeleteReservationAdmin";
import { useReservationFindReservations } from "@/hooks/database/reservations/useReservationFindReservations";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

export const useAdmin = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const {
    mutateAsync: createReservationAdmin,
    isPending: isLoadingCreateReservationAdmin,
  } = useReservationCreateReservationAdmin();
  const {
    mutateAsync: deleteReservationAdmin,
    isPending: isLoadingDeleteReservationAdmin,
  } = useReservationDeleteReservationAdmin();
  const {
    refetch,
    data: allReservations,
    isLoading: isLoadingReservations,
  } = useReservationFindReservations({
    dates: [
      dayjs(selectedDate).subtract(1, "day").format("YYYY-MM-DD"),
      dayjs(selectedDate).format("YYYY-MM-DD"),
      dayjs(selectedDate).add(1, "day").format("YYYY-MM-DD"),
    ],
  });

  const daysList = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) =>
        // with -1 the central day is today
        dayjs(selectedDate).add(i - 1, "day")
      ).map((day) => ({
        value: day.format("YYYY-MM-DD"),
        label: `${day.format("dddd").slice(0, 3)} ${day.format("D")}`,
      })),
    [selectedDate]
  );

  return {
    createReservationAdmin,
    deleteReservationAdmin,
    refetch,
    selectedDate,
    setSelectedDate,
    allReservations,
    isLoadingReservations,
    isLoadingCreateReservationAdmin,
    isLoadingDeleteReservationAdmin,
    daysList,
  };
};
