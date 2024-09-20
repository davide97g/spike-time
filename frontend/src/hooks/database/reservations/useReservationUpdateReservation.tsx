import { API_AUTH } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { STReservation } from "types/reservation.types";

export const useReservationUpdateReservation = () => {
  return useMutation({
    mutationFn: async ({ reservation }: { reservation: STReservation }) => {
      try {
        await API_AUTH.updateReservation({
          reservation,
        });
      } catch (e) {
        console.error(e);
        throw new Error("Error updating reservation");
      }
    },
  });
};
