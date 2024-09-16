import { db } from "@/config/firebase";
import { STReservation } from "types/slot.types";
import { useMutation } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";

export const useReservationDeleteReservation = () => {
  return useMutation({
    mutationFn: async (reservation: STReservation) => {
      try {
        const docRef = doc(db, "reservations", reservation.id);
        await deleteDoc(docRef);
      } catch (e) {
        console.error(e);
        throw new Error("Error deleting reservation");
      }
    },
  });
};
