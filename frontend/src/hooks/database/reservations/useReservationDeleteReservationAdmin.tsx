import { API_ADMIN } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { STReservation } from "types/reservation.types";

export const useReservationDeleteReservationAdmin = () => {
  return useMutation({
    mutationFn: async (reservation: STReservation) => {
      try {
        await API_ADMIN.deleteReservationAdmin({
          reservationId: reservation.id,
        });
      } catch (e) {
        console.error(e);
        throw new Error("Error deleting reservation admin");
      }
    },
  });
};
