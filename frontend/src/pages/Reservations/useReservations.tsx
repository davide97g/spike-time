import { useReservationDeleteReservation } from "@/hooks/database/reservations/useReservationDeleteReservation";
import { useReservationFindReservations } from "@/hooks/database/reservations/useReservationFindReservations";
import { useUserUpdateUser } from "@/hooks/database/user/useUserUpdateUser";
import { useAuth } from "@/hooks/useAuth";
import { STReservation } from "@/types/slot.types";
import dayjs from "dayjs";

export const useReservations = ({
  startDate,
}: Readonly<{ startDate: Date | undefined }>) => {
  const { user } = useAuth();

  const { mutateAsync: updateUser, isPending: loadingUserUpdate } =
    useUserUpdateUser();
  const {
    data: reservations,
    isFetching,
    refetch,
  } = useReservationFindReservations({
    dates: startDate ? [dayjs(startDate).format("YYYY-MM-DD")] : undefined,
    userId: user?.id,
  });

  const { mutateAsync: deleteReservation, isPending } =
    useReservationDeleteReservation();

  const isReservationExpired = (date: string) => {
    const reservationDate = dayjs(date);
    const currentDate = dayjs().startOf("day");
    return reservationDate.isBefore(currentDate, "day");
  };

  const isReservationLocked = (date: string, hourStart: number) => {
    const reservationDate = dayjs(date).hour(hourStart);
    const currentDate = dayjs().add(1, "day");
    console.log(
      currentDate.format("YYYY-MM-DD HH:mm"),
      reservationDate.format("YYYY-MM-DD HH:mm")
    );
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
    isLoading: isFetching || isPending || loadingUserUpdate,
    deleteReservation,
    refetch,
    getReservationStatus,
    updateUser,
  };
};
