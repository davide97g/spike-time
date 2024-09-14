import { db } from "@/config/firebase";
import { STReservation } from "@/types/slot.types";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";

export const useReservationFindReservations = ({
  date,
  userId,
}: Readonly<{ date?: string; userId?: string }>) => {
  return useQuery({
    queryKey: ["reservations", date, userId],
    queryFn: async () => {
      const contraints = [];
      if (date) contraints.push(where("date", "==", date));
      if (userId) contraints.push(where("userId", "==", userId));
      const docRef = query(collection(db, "reservations"), ...contraints);
      const docSnap = await getDocs(docRef);
      return docSnap.docs.map((doc) => doc.data() as STReservation);
    },
  });
};
