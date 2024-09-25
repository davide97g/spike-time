import { useReservationFindReservationsAdmin } from "@/hooks/database/reservations";
import { useAuth } from "@/hooks/useAuth";
import dayjs from "dayjs";
import { STReservation } from "types/reservation.types";

export const useAllReservations = ({
  startDate,
}: Readonly<{
  startDate: Date | undefined;
}>) => {
  const { user } = useAuth();

  const {
    data: reservations,
    isFetching,
    refetch,
  } = useReservationFindReservationsAdmin({
    dates: startDate ? [dayjs(startDate).format("YYYY-MM-DD")] : undefined,
    userId: user?.id,
  });

  const isReservationExpired = (date: string) => {
    const reservationDate = dayjs(date);
    const currentDate = dayjs().startOf("day");
    return reservationDate.isBefore(currentDate, "day");
  };

  const isReservationLocked = (date: string, hourStart: number) => {
    const reservationDate = dayjs(date).hour(hourStart);
    const currentDate = dayjs().add(1, "day");
    return reservationDate.isBefore(currentDate, "minutes");
  };

  const getReservationStatus = (reservation: STReservation) => {
    const isExpired = isReservationExpired(reservation.date);
    const isLocked =
      !isExpired &&
      isReservationLocked(reservation.date, reservation.hourStart);

    if (isLocked) return "locked";
    if (isExpired) return "expired";
    return "active";
  };

  return {
    reservations,
    isLoading: isFetching,
    refetch,
    getReservationStatus,
  };
};
