import { API_ADMIN } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { STReservationAdmin } from "types/reservation.types";

export const useReservationCreateReservationAdmin = () => {
  return useMutation({
    mutationFn: async (reservationAdmin: STReservationAdmin) => {
      try {
        await API_ADMIN.createReservationAdmin({
          reservationAdmin,
        });
      } catch (e) {
        console.error(e);
        throw new Error("Error creating reservation admin");
      }
    },
  });
};
