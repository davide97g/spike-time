import { db } from "@/config/firebase";
import { STReservation } from "types/slot.types";
import { useMutation } from "@tanstack/react-query";
import { doc, setDoc } from "firebase/firestore";

export const useChangeSlotState = () => {
  return useMutation({
    mutationFn: async (slot: STReservation) => {
      try {
        const docRef = doc(db, "reservations", slot.id);
        await setDoc(docRef, slot, { merge: true });
      } catch (e) {
        console.error(e);
        throw new Error("Error making slot unavailable");
      }
    },
  });
};
