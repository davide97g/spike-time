import { useReservationCreateReservation } from "@/hooks/database/reservations/useReservationCreateReservation";
import { useReservationFindReservations } from "@/hooks/database/reservations/useReservationFindReservations";
import { useUserUpdateUser } from "@/hooks/database/user/useUserUpdateUser";
import { useAuth } from "@/hooks/useAuth";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useBook = () => {
  const [indexDay, setIndexDay] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const navigate = useNavigate();

  const { mutateAsync: updateUser } = useUserUpdateUser();
  const { mutateAsync: createReservation } = useReservationCreateReservation();
  const { user, refetch: refetchUser } = useAuth();
  const {
    data: reservations,
    isFetching: loadingReservations,
    refetch,
  } = useReservationFindReservations({
    dates: [
      dayjs(selectedDate).subtract(1, "day").format("YYYY-MM-DD"),
      dayjs(selectedDate).format("YYYY-MM-DD"),
      dayjs(selectedDate).add(1, "day").format("YYYY-MM-DD"),
    ],
  });

  const reserveSlot = (day: string, hour: number) => {
    if (!user?.credits) {
      toast("Error reserving", {
        description: "You don't have enough credits to make a reservation",
        action: {
          label: "Buy credits",
          onClick: () => navigate("/shop"),
        },
      });
      return;
    } else
      createReservation({
        id: crypto.randomUUID(),
        date: dayjs(day).format("YYYY-MM-DD"),
        hourStart: hour,
        hourEnd: hour + 1,
        userId: user.id,
      })
        .then(() => {
          updateUser({
            id: user.id,
            credits: (user.credits ?? 0) - 1,
          }).finally(() => refetchUser());
          toast("Reservation created", {
            description: `Reservation created for ${day} at ${hour}:00`,
          });
        })
        .finally(() => refetch());
  };

  const daysList = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) =>
        // with -1 the central day is today
        dayjs(selectedDate).add(i + indexDay - 1, "day")
      ).map((day) => ({
        value: day.format("YYYY-MM-DD"),
        label: `${day.format("dddd").slice(0, 3)} ${day.format("D")}`,
      })),
    [indexDay, selectedDate]
  );

  const getSlotType = useCallback(
    (day: string, hour: number) => {
      // check if is in the past
      if (dayjs(day).hour(hour).isBefore(dayjs(), "minute")) return "reserved"; // TODO: change to "past" when past is implemented
      const reservation = reservations?.find(
        (reservation) =>
          reservation.date === day && reservation.hourStart === hour
      );

      if (reservation?.unavailable) return "unavailable";
      if (!reservation) return "available";
      if (reservation.userId === user?.id) return "owned";
      return "reserved";
    },
    [reservations, user]
  );

  return {
    indexDay,
    setIndexDay,
    selectedDate,
    setSelectedDate,
    reserveSlot,
    daysList,
    getSlotType,
    loadingReservations,
  };
};
