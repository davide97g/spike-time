import { API_ADMIN } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { STReservation } from "types/reservation.types";

export const useReservationCreateReservationAdmin = () => {
  return useMutation({
    mutationFn: async (reservation: STReservation) => {
      try {
        await API_ADMIN.createReservationAdmin({
          reservation,
        });
      } catch (e) {
        console.error(e);
        throw new Error("Error creating reservation admin");
      }
    },
  });
};
