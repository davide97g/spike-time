import { db } from "@/config/firebase";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { doc, setDoc } from "firebase/firestore";
import { STReservation } from "types/slot.types";

export const useReservationEditReservation = ({
  date,
  hourStart,
}: {
  date?: Date;
  hourStart?: number;
}) => {
  return useMutation({
    mutationFn: async (reservation: STReservation) => {
      try {
        const docRef = doc(db, "reservations", reservation.id);
        await setDoc(docRef, {
          ...reservation,
          date: dayjs(date).format("YYYY-MM-DD"),
          hourStart,
          hourEnd: hourStart! + 1,
        });
      } catch (e) {
        console.error(e);
        throw new Error("Error editing reservation");
      }
    },
  });
};
