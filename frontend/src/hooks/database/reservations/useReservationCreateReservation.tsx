import { API_AUTH } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { STReservation } from "types/reservation.types";

export const useReservationCreateReservation = () => {
  return useMutation({
    mutationFn: async (reservation: STReservation) => {
      try {
        await API_AUTH.createReservation({
          reservation,
        });
      } catch (e) {
        console.error(e);
        throw new Error("Error creating reservation");
      }
    },
  });
};
