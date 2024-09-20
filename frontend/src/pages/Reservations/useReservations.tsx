import { useReservationDeleteReservation } from "@/hooks/database/reservations/useReservationDeleteReservation";
import { useReservationFindReservations } from "@/hooks/database/reservations/useReservationFindReservations";
import { useReservationUpdateReservation } from "@/hooks/database/reservations/useReservationUpdateReservation";
import { useUserUpdateUser } from "@/hooks/database/user/useUserUpdateUser";
import { useAuth } from "@/hooks/useAuth";
import dayjs from "dayjs";
import { STReservation } from "types/reservation.types";

export const useReservations = ({
  startDate,
  startDateEditMode,
}: Readonly<{
  startDate: Date | undefined;
  startDateEditMode: Date | undefined;
}>) => {
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

  const { data: allReservations, isLoading: isLoadingAllReservations } =
    useReservationFindReservations({
      dates: [dayjs(startDateEditMode).format("YYYY-MM-DD")],
      enabled: !!startDateEditMode,
    });

  const {
    mutateAsync: updateReservation,
    isPending: isPendingUpdateReservation,
  } = useReservationUpdateReservation();

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
    allReservations,
    isLoading: isFetching || isPending || loadingUserUpdate,
    isLoadingAllReservations,
    deleteReservation,
    refetch,
    getReservationStatus,
    updateUser,
    updateReservation,
    isPendingUpdateReservation,
  };
};
