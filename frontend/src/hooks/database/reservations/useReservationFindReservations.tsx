import { db } from "@/config/firebase";
import { STReservation } from "types/reservation.types";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";

export const useReservationFindReservations = ({
  dates,
  userId,
}: Readonly<{ dates?: string[]; userId?: string }>) => {
  return useQuery({
    queryKey: ["reservations", dates?.join("-") ?? "-", userId],
    queryFn: async () => {
      const contraints = [];
      if (dates) contraints.push(where("date", "in", dates));
      if (userId) contraints.push(where("userId", "==", userId));
      const docRef = query(collection(db, "reservations"), ...contraints);
      const docSnap = await getDocs(docRef);
      return docSnap.docs.map((doc) => doc.data() as STReservation);
    },
  });
};
