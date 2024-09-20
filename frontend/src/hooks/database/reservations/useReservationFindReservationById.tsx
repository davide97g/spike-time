import { db } from "@/config/firebase";
import { STReservation } from "types/reservation.types";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";

export const useReservationFindReservationById = ({
  id,
}: Readonly<{ id?: string }>) => {
  return useQuery({
    queryKey: ["reservations", id],
    queryFn: async () => {
      const docRef = doc(db, "reservations", id!);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) return docSnap.data() as STReservation;
      return undefined;
    },
    enabled: !!id,
  });
};
