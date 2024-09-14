import { db } from "@/config/firebase";
import { STReservation } from "@/types/slot.types";
import { useMutation } from "@tanstack/react-query";
import { doc, setDoc } from "firebase/firestore";

export const useReservationCreateReservation = () => {
  return useMutation({
    mutationFn: async (reservation: STReservation) => {
      try {
        const docRef = doc(db, "reservations", reservation.id);
        await setDoc(docRef, reservation, { merge: true });
      } catch (e) {
        console.error(e);
        throw new Error("Error creating reservation");
      }
    },
  });
};
