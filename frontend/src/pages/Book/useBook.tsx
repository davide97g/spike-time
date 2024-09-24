import { useReservationCreateReservation } from "@/hooks/database/reservations/useReservationCreateReservation";
import { useReservationFindReservations } from "@/hooks/database/reservations/useReservationFindReservations";
import { useAuth } from "@/hooks/useAuth";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useBook = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const navigate = useNavigate();

  const { mutateAsync: createReservation } = useReservationCreateReservation();
  const { user } = useAuth();
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
        dayjs(selectedDate).add(i - 1, "day")
      ).map((day) => ({
        value: day.format("YYYY-MM-DD"),
        label: `${day.format("dddd").slice(0, 3)} ${day.format("D")}`,
      })),
    [selectedDate]
  );

  const getSlotType = useCallback(
    (day: string, hour: number) => {
      // check if is in the past
      if (dayjs(day).hour(hour).isBefore(dayjs().hour(hour), "minute"))
        return "past";
      const reservation = reservations?.find(
        (reservation) =>
          reservation.date === day && reservation.hourStart === hour
      );

      if (!reservation) return "available";
      if (reservation.unavailable) return "unavailable";
      if (reservation.userId === user?.id) return "owned";
      return "reserved";
    },
    [reservations, user]
  );

  return {
    selectedDate,
    setSelectedDate,
    reserveSlot,
    daysList,
    getSlotType,
    loadingReservations,
    refetch,
  };
};
